import {Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {TokenService} from "../../../../services/token/token.service";
import {isPlatformBrowser} from "@angular/common";
import {AuthenticationResponse} from "../../../../services/models/authentication-response";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isDropdownOpen = false;
  isBusinessOwner = false;

  constructor(private elementRef: ElementRef,
              private tokenService: TokenService,
              private authService: AuthenticationService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.isBusinessOwner = false;
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.checkUserRole();
    if (isPlatformBrowser(this.platformId)) {
      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach(link => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
        }
        link.addEventListener('click', () => {
          linkColor.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }
  }

  private checkUserRole() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.authService.checkBusinessOwner({ userId: parseInt(userId, 10) }).subscribe(
          (isBusinessOwner: boolean) => {
            this.isBusinessOwner = isBusinessOwner;
          },
          (error) => {
            console.error('Error checking business owner status:', error);
            this.isBusinessOwner = false;
          }
        );
      } else {
        this.isBusinessOwner = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    }
  }

  viewProfile() {
    console.log('View profile clicked');
    this.router.navigate(['tasty-fast/profile']);
  }

  accountSettings() {
    console.log('Account settings clicked');
    this.router.navigate(['tasty-fast/user-settings']);
    this.isDropdownOpen = false;
  }
}
