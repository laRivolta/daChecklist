import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private _platform: Platform,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this._platform.ready().then(() => {
      
      if (this.isNative()) {
        this.initNative();
      }

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'todo']);
        } else {
          this.router.navigate(['home']);
        }
      });

    });
  }

  private initNative() {
      SplashScreen.hide().catch(error => {
        console.error(error);
      });
      StatusBar.hide().catch(error => {
        console.error(error);
      });
  }

  private isBrowser() {
    return !this.isNative();
  }

  private isNative() {
    return this._platform.is('electron');
  }

}
