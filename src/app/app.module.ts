import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReiseAnzeigenComponent } from './fachlich/reise-anzeigen/reise-anzeigen.component';
import { InboxComponent } from './fachlich/inbox/inbox.component';
import { ProfilComponent } from './fachlich/profil/profil.component';
import { RestService } from './technisch/rest.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './technisch/header/header.component';
import { FooterComponent } from './technisch/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule, MatCardModule, MatIconModule, MatNativeDateModule,MatButtonModule, MatDialogModule, MatDatepickerModule, MatInputModule, MatMenuModule, MatTabsModule } from '@angular/material';
import { LoginRouteGuard } from './technisch/login-route-guard';
import { ReiseAnlegenComponent } from './fachlich/reise-anlegen/reise-anlegen.component';
import { HomeComponent } from './fachlich/home/home.component';
import { LoginComponent } from './technisch/login/login.component';
import { PadacaService } from './fachlich/padaca.service';
import { ChangePasswordComponent } from './technisch/change-password/change-password.component';
import { SearchComponent } from './fachlich/search/search.component';
import { PinnedComponent } from './fachlich/pinned/pinned.component';

const routConfig: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'reiseAnlegen',
    component: ReiseAnlegenComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'reiseAnzeigen/:Start/:Ziel/:Datum',
    component: ReiseAnzeigenComponent,
    canActivate: [LoginRouteGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfilComponent,
    InboxComponent,
    ReiseAnlegenComponent,
    ReiseAnzeigenComponent,
    LoginComponent,
    ChangePasswordComponent,
    SearchComponent,
    PinnedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routConfig, { useHash: true }),
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatNativeDateModule
  ],
  providers: [
    RestService,
    PadacaService,
    LoginRouteGuard
  ],
  entryComponents: [
    LoginComponent,
    ChangePasswordComponent,
    PinnedComponent,
    SearchComponent,
    PinnedComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
