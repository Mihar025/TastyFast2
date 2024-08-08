import { Component } from '@angular/core';
import { RegistrationBusinessAccountRequest } from "../../services/models/registration-business-account-request";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/services/authentication.service";

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss']
})
export class RegisterBusinessComponent {

  registerBusinessRequest: RegistrationBusinessAccountRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    businessType: ''
  };
  errorMsg: string[] = [];
  successMsg: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  registerBusiness() {
    this.errorMsg = [];
    this.authService.registerBusinessAccount({
      body: this.registerBusinessRequest
    })
      .subscribe({
        next: (response: string) => {
          console.log('Business registration successful', response);
          this.successMsg = 'Registration successful. Redirecting to activation page...';
          setTimeout(() => {
            this.router.navigate(['activate-account']);
          }, 2000); // Добавлено небольшое ожидание перед переходом
        },
        error: (err) => {
          console.error('Business registration error', err);
          if (err.error && typeof err.error === 'string') {
            this.errorMsg = [err.error];
          } else if (err.error && err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg = ['An unexpected error occurred'];
          }
        },
        complete: () => {
          console.log('Business registration request completed');
        }
      });
  }
}
