import { RestService } from './technisch/rest.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AgmTestComponent } from './agm-test/agm-test.component';
import { HomeComponent } from './home/home.component';

const routConfig: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'agm',
    component: AgmTestComponent
  }
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'orderView',
  //   component: OrderViewComponent,
  //   canActivate: [LoginRouteGuard]
  // },
  // {
  //   path: 'administration',
  //   component: AdministrationComponent,
  //   canActivate: [AdminRouteGuard]
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    AgmTestComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routConfig, { useHash: true }),
  ],
  providers: [
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
