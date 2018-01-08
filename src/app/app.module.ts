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
import { MatToolbarModule, MatCardModule, MatIconModule, MatNativeDateModule, MatListModule, MatButtonModule, MatDialogModule, MatDatepickerModule, MatInputModule, MatMenuModule, MatTabsModule, MAT_DATE_LOCALE } from '@angular/material';
import { LoginRouteGuard } from './technisch/login-route-guard';
import { ReiseAnlegenComponent } from './fachlich/reise-anlegen/reise-anlegen.component';
import { HomeComponent } from './fachlich/home/home.component';
import { LoginComponent } from './technisch/login/login.component';
import { PadacaService } from './fachlich/padaca.service';
import { ChangePasswordComponent } from './technisch/change-password/change-password.component';
import { SearchComponent } from './fachlich/search/search.component';
import { PinnedComponent } from './fachlich/pinned/pinned.component';
import { ChatPartnerComponent } from './fachlich/inbox/chat-partner/chat-partner.component';
import { ChatComponent } from './fachlich/inbox/chat/chat.component';
import { UserPipe } from './fachlich/user.pipe';
import { BewertungComponent } from './fachlich/profil/bewertung/bewertung.component';
import { MessageComponent } from './fachlich/inbox/chat/message/message.component';

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
    path: 'profil', // zeigt das eigene Profil an
    component: ProfilComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'profil/:userID', // zeigt das Profil des übergebenen Users an
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
    path: 'reiseAnzeigen/:reiseID',
    component: ReiseAnzeigenComponent,
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
    PinnedComponent,
    ChatPartnerComponent,
    ChatComponent,
    UserPipe,
    BewertungComponent,
    MessageComponent
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
    MatNativeDateModule,
    MatListModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    RestService,
    PadacaService,
    LoginRouteGuard
  ],
  entryComponents: [
    LoginComponent,
    ChangePasswordComponent,
    PinnedComponent,
    SearchComponent,
    PinnedComponent,
    BewertungComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
