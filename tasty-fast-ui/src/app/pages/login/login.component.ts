import { Component } from '@angular/core';
import { AuthenticationRequest } from "../../services/models/authentication-request";
import { AuthenticationService } from "../../services/services/authentication.service";
import { Router } from "@angular/router";
import { TokenService } from "../../services/token/token.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private jwtHelper: JwtHelperService
  ) {}

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;

        // Декодируем токен
        const decodedToken = this.jwtHelper.decodeToken(res.token as string);

        // Извлекаем userId из токена и сохраняем в localStorage
        if (decodedToken && decodedToken.userId) {
          localStorage.setItem('userId', decodedToken.userId.toString());
          console.log('User ID saved:', decodedToken.userId);
        } else {
          console.warn('Unable to extract user ID from token');
        }

        this.router.navigate(['tasty-fast']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  /*
    login() {
      this.errorMsg = [];
      this.authService.authenticate({
        body: this.authRequest
      }).subscribe({
        next: (res) => {
          this.tokenService.token = res.token as string;
          this.router.navigate(['tasty-fast']);
        },
        error: (err) => {
          console.log(err);
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.errorMsg);
          }
        }
      });
    }

  */
  register() {
    this.router.navigate(['register'])
  }

  registerBusinessAccount() {
    this.router.navigate(['register-business'])
  }
}
