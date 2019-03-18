import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'todo']);
        } else {
          this.router.navigate(['home']);
        }
      });
    });
  }
}
