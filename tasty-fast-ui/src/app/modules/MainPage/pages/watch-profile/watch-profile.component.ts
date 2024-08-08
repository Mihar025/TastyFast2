import { Component, OnInit } from '@angular/core';
import {UserResponse} from "../../../../services/models/user-response";
import {UserControllerService} from "../../../../services/services/user-controller.service";

@Component({
  selector: 'app-watch-profile',
  templateUrl: './watch-profile.component.html',
  styleUrls: ['./watch-profile.component.scss']
})
export class WatchProfileComponent implements OnInit {
  userInfo: UserResponse | null = null;
  errorMessage: string = '';

  constructor(private userService: UserControllerService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    const userId = localStorage.getItem('userId'); // Предполагаем, что ID пользователя хранится в localStorage
    if (userId) {
      this.userService.showAllUserInformation({ userId: parseInt(userId, 10) }).subscribe({
        next: (response: UserResponse) => {
          this.userInfo = response;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load user information: ' + error.message;
        }
      });
    } else {
      this.errorMessage = 'User ID not found. Please log in.';
    }
  }
}
