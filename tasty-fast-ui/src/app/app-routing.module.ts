import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RegisterBusinessComponent} from "./pages/register-business/register-business.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {RestaurantDetailsComponent} from "./modules/MainPage/pages/restaurant-details/restaurant-details.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'register-business',
    component: RegisterBusinessComponent
  },
  {
    path: 'details',
    component: RestaurantDetailsComponent
  },

  {
    path: 'tasty-fast',
    loadChildren: () => import('./modules/MainPage/main-page.module')
      .then(m => m.MainPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
