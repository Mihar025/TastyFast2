import { Component, OnInit } from '@angular/core';
import { UserControllerService } from "../../../../services/services/user-controller.service";
import { Router } from "@angular/router";
import { UserIdResponse } from "../../../../services/models/user-id-response";
import { FirstNameRequest } from "../../../../services/models/first-name-request";
import { EmailRequest } from "../../../../services/models/email-request";
import { PasswordChangeRequest } from "../../../../services/models/password-change-request";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  showUsernameForm = false;
  newUsername = '';

  showEmailForm = false;
  newEmail = '';

  showPasswordForm = false;
  currentPassword = '';
  newPassword = '';

  currentUserId: number | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private userService: UserControllerService,
    private router: Router,
  ) {}

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const userId = parseInt(storedUserId, 10);
      this.userService.getCurrentUserId({ userId }).subscribe({
        next: (response: UserIdResponse) => {
          if (response.currentId !== undefined) {
            this.currentUserId = response.currentId;
          } else {
            this.errorMessage = 'User ID is undefined';
          }
        },
        error: (error) => {
          this.errorMessage = 'Failed to get user ID: ' + error.message;
        }
      });
    } else {
      this.errorMessage = 'User ID not found. Please log in again.';
      // this.router.navigate(['/login']);
    }
  }

  toggleUsernameForm() {
    this.showUsernameForm = !this.showUsernameForm;
    if (!this.showUsernameForm) {
      this.newUsername = '';
    }
  }
  changeUsername() {
    if (!this.currentUserId) {
      this.errorMessage = 'User ID is not set. Please log in again.';
      return;
    }

    if (this.newUsername) {
      this.isLoading = true;
      const firstNameRequest: FirstNameRequest = {
        firstName: this.newUsername
      };
      this.userService.changeFirstName({
        userId: this.currentUserId,
        body: firstNameRequest
      }).subscribe({
        next: (response) => {
          console.log('Username updated successfully');
          this.toggleUsernameForm();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to update username: ' + error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'New username is empty';
    }
  }
  toggleEmailForm() {
    this.showEmailForm = !this.showEmailForm;
    if (!this.showEmailForm) {
      this.newEmail = '';
    }
  }

  changeEmail() {
    if (!this.currentUserId) {
      this.errorMessage = 'User ID is not set. Please log in again.';
      return;
    }
    if (this.newEmail) {
      this.isLoading = true;
      const emailRequest: EmailRequest = {
        email: this.newEmail
      };
      this.userService.changeEmail({
        userId: this.currentUserId,
        body: emailRequest
      }).subscribe({
        next: (response) => {
          console.log('Email updated successfully');
          this.toggleUsernameForm();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to update email: ' + error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'New email is empty';
    }
  }


  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
    if (!this.showPasswordForm) {
      this.newPassword = '';
    }
  }

  changePassword() {
    if (!this.currentUserId) {
      this.errorMessage = 'User ID is not set. Please log in again.';
      return;
    }
    if (this.newPassword) {
      this.isLoading = true;
      const passwordRequest: PasswordChangeRequest = {
        newPassword: this.newPassword
      };
      this.userService.changePassword({
        userId: this.currentUserId,
        body: passwordRequest
      }).subscribe({
        next: (response) => {
          console.log('Password updated successfully');
          this.togglePasswordForm();
          this.isLoading = false;
          this.newPassword = '';
          // Можно добавить отображение сообщения об успешном изменении пароля
        },
        error: (error) => {
          this.errorMessage = 'Failed to update password: ' + error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'New password is empty';
    }
  }
  deleteAccount() {
    if (this.currentUserId !== null) {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        this.isLoading = true;
        this.userService.deleteAccount({ userId: this.currentUserId }).subscribe({
          next: () => {
            console.log('Account deleted successfully');
            localStorage.removeItem('userId');
            this.router.navigate(['/']);
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Failed to delete account: ' + error.message;
            this.isLoading = false;
          }
        });
      }
    } else {
      this.errorMessage = 'User ID is not set';
    }
  }
}
