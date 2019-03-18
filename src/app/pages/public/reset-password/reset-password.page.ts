import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetPwdForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor( 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,  
    private router: Router,
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService ) { 

      this.resetPwdForm = this.formBuilder.group({
        username: ['', Validators.compose([
          Validators.maxLength(150), 
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), 
          Validators.required
        ])],
      });
  }

  ngOnInit() {}

  resetPassword(resetPwdForm: FormGroup): void {
    if (!resetPwdForm.valid) {
      console.log(
        'Form is not valid yet, current value:', resetPwdForm.value
      );
    } else {
      const username: string = resetPwdForm.value.username;
      this.authService.resetPassword(username).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.router.navigateByUrl('login');
                },
              },
            ],
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await errorAlert.present();
        }
      );
    }
  }  

  // convenience getter for easy access to form fields
  get f() { return this.resetPwdForm.controls; }

}
