import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor( 
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,  
      private router: Router,
      private formBuilder: FormBuilder, 
      private authService: AuthenticationService ) { 

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.maxLength(150), 
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), 
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6), 
        Validators.required
      ])],
    });
  }

  ngOnInit() {}

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
  
      const username = loginForm.value.username;
      const password = loginForm.value.password;
  
      this.authService.loginUser(username, password).then(
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
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

}
