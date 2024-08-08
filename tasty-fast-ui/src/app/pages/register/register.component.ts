import { Component } from '@angular/core';
import { RegistrationRequest } from "../../services/models/registration-request";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: string[] = [];
  successMsg: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.registerUser({
      body: this.registerRequest
    })
      .subscribe({
        next: (response: string) => {
          console.log('Registration successful', response);
          setTimeout(() => {
            this.router.navigate(['activate-account']);
          }, 1000);
        },
        error: (err) => {
          console.error('Registration error', err);
          if (err.error && typeof err.error === 'string') {
            this.errorMsg = [err.error];
          } else {
            this.errorMsg = ['An unexpected error occurred'];
          }
        },
        complete: () => {
          console.log('Registration request completed');
        }
      });
  }
}
