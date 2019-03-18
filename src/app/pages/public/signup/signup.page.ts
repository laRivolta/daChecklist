import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private signupForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor( 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,  
    private router: Router,
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService ) { 
  }

  ngOnInit() {this.signupForm = this.formBuilder.group({
    username: ['', Validators.compose([
      Validators.maxLength(150), 
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), 
      Validators.required
    ])],
    password: ['', Validators.compose([
      Validators.minLength(6), 
      Validators.required
    ])],
  });}

  async signupUser(signupForm: FormGroup): Promise<void> {
    
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const username: string = signupForm.value.username;
      const password: string = signupForm.value.password;
  
      this.authService.signupUser(username, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigate(['member', 'todos']);
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

}
