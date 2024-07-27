import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CodeInputModule } from "angular-code-input";

import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ActivateAccountComponent } from "./pages/activate-account/activate-account.component";
import { RegisterBusinessComponent } from "./pages/register-business/register-business.component";
import {MainComponent} from "./modules/MainPage/pages/main/main.component";
import {MenuComponent} from "./modules/MainPage/components/menu/menu.component";
import {RestaurantListComponent} from "./modules/MainPage/pages/restaurant-list/restaurant-list.component";
import {StoreListComponent} from "./modules/MainPage/pages/store-list/store-list.component";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import {RestaurantDetailsComponent} from "./modules/MainPage/pages/restaurant-details/restaurant-details.component";
import {StoresDetailsComponent} from "./modules/MainPage/pages/stores-details/stores-details.component";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {WatchProfileComponent} from "./modules/MainPage/pages/watch-profile/watch-profile.component";

@NgModule({
  declarations: [
    AppComponent,
     LoginComponent,
      RegisterComponent,
       ActivateAccountComponent,
        RegisterBusinessComponent,
         MainComponent,
          MenuComponent,
           RestaurantListComponent,
            StoreListComponent,
             RestaurantDetailsComponent,
              StoresDetailsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    CodeInputModule,

  ],
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
