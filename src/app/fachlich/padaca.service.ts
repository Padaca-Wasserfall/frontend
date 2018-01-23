import { Router } from '@angular/router';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Reise, User, Route, LoginDTO, ChangePasswordDTO, RegisterDTO, Message, Bewertung, Session } from './interfaces';
import { RestService } from '../technisch/rest.service';

@Injectable()
export class PadacaService {

  @Output() loggedIn = new EventEmitter<any>();
  @Output() loggedOut = new EventEmitter<any>();
  @Output() sessionUpdated = new EventEmitter<any>();

  // private session: Session = {
  //   userID: 111,
  //   sessionkey: 'ljdsakfsahf'
  // };
  private session: Session;

  constructor(private restService: RestService, private router: Router) { }

  //#region Verwaltung der Session 
  public getSession(): Session {
    if (!this.session) {
      this.session = JSON.parse(localStorage.getItem('session'));
    }
    return this.session;
  }

  public setSession(session: Session) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  public removeSession() {
    localStorage.removeItem('session');
    this.router.navigate(['/home']);
  }
  //#endregion

  //#region Account
  /**
   * Führt den Registrierungsprozess für einen User aus.
   */
  public getRegister(dto: RegisterDTO): Observable<Response> {
    return this.restService.getRequest('/register?username=' + dto.username + '&password=' + dto.password);
  }

  /**
   * Liefert die Session des Users zurück.
   */
  public getLogin(dto: LoginDTO): Observable<Response> {
    return this.restService.getRequest('/login?username=' + dto.username + '&password=' + dto.password);
  }

  /**
   * Verwirft die Session.
   */
  public getLogout(): Observable<Response> {
    return this.restService.getRequest('/logout?sessionkey=' + this.session.sessionkey);
  }

  /**
   * Ändert das Passwort eines Users.
   */
  public getChangePassword(dto: ChangePasswordDTO): Observable<Response> {
    return this.restService.getRequest('/password?sessionkey=' + this.session.sessionkey + '&old=' + dto.old + '&new=' + dto.new);
  }
  //#endregion

  //#region Inbox
  /**
   * Liefert alle Chatpartner eines Users zurück.
   */
  public getChatPartner(): Observable<Response> {
    return this.restService.getRequest('/inbox?sessionkey=' + this.session.sessionkey);
  }

  /**
   * Liefert das Chat-Objekt zu einem Chatpartner zurück, dass alle Nachrichten enthält.
   */
  public getChat(chatPartner: User): Observable<Response> {
    return this.restService.getRequest('/inbox?sessionkey=' + this.session.sessionkey + '&userID=' + chatPartner.userID);
  }

  public putSendMessage(message: Message): Observable<Response> {
    return this.restService.putRequest('/inbox?sessionkey=' + this.session.sessionkey, message);
  }
  //#endregion

  //#region Reise als Fahrer
  /**
   * Erstellt eine Reise.
   */
  public postReiseErstellen(reise: Reise): Observable<Response> {
    return this.restService.putRequest('/reise?sessionkey=' + this.session.sessionkey, reise);
  }

  /**
   * Liefert alle Reisen eines Users als Fahrer zurück.
   */
  public getReisenAlsFahrer(user: User): Observable<Response> {
    return this.restService.getRequest('/reise/fahrer?sessionkey=' + this.session.sessionkey + '&userID=' + user.userID);
  }

  /**
   * Liefert die entsprechende Reise zurück.
   */
  public getReise(reiseID: number): Observable<Response> {
    return this.restService.getRequest('/reise?reiseID=' + reiseID);
  }

  /**
   * Bestätigt oder verweigert die Anfrage eines Mitfahrers.
   */
  public postMitfahrtBestätigen(reiseID: number, userID: number, antwort: boolean): Observable<Response> {
    return this.restService.postRequest('/reise/antwort?sessionkey=' + this.session.sessionkey
      + '&reiseID=' + reiseID + '&userID=' + userID + '&antwort=' + antwort, {});
  }

  /**
   * Sagt die Reise ab & benachrichtigt die betroffenen Personen.
   */
  public postReiseAbsagen(reise: Reise, message: string) {
    return this.restService.postRequest('/reise/absagen?sessionkey=' + this.session.sessionkey, message);
  }
  //#endregion

  //#region Reise als Mitfahrer
  /**
   * Liefert alle möglichen Mitfahrgelegenheiten für die geplante Route.
   */
  public getSucheReise(route: Route): Observable<Response> {
    return this.restService.getRequest('/reise/search?start=' + route.start + '&ziel=' + route.ziel + '&datum=' + route.zeitstempel);
  }

  /**
   * Liefert alle Reisen eines Users als Mitfahrer zurück.
   */
  public getReisenAlsMitfahrer(user: User): Observable<Response> {
    return this.restService.getRequest('/reise/mitfahrer?sessionkey=' + this.session.sessionkey + '&userID=' + user.userID);
  }

  /**
   * Fragt bei dem Fahrer an, ob man mitfahren darf.
   */
  public putReiseAnfragen(reise: Reise): Observable<Response> {
    return this.restService.putRequest('/reise/anfragen?sessionkey=' + this.session.sessionkey + '&reiseID=' + reise.reiseID, {});
  }

  /**
   * Meldet einen Mitfahrer von der Reise ab & benachrichtigt die betroffenen Personen.
   */
  public postReiseAbmelden(reise: Reise, message: string) {
    return this.restService.postRequest('/reise/abmelden?sessionkey=' + this.session.sessionkey + '&reiseID=' + reise.reiseID, message);
  }
  //#endregion

  //#region Pinned
  /**
   * Speichert die Reise unter den angepinnten Reisen.
   */
  public getPinned(): Observable<Response> {
    return this.restService.getRequest('/pinned?sessionkey=' + this.session.sessionkey);
  }

  /**
   * Speichert die Reise unter den angepinnten Reisen.
   */
  public putPinned(reise: Reise): Observable<Response> {
    return this.restService.putRequest('/pinned?sessionkey=' + this.session.sessionkey + '&reiseID=' + reise.reiseID, {});
  }

  /**
   * Löscht die Reise aus den angepinnten Reisen.
   */
  public deletePinned(reise: Reise): Observable<Response> {
    return this.restService.deleteRequest('/pinned?sessionkey=' + this.session.sessionkey + '&reiseID=' + reise.reiseID);
  }
  //#endregion

  //#region Profil
  /**
   * Liefert den entsprechenden User mit allen Infos zurück.
   */
  public getUser(userID: number): Observable<Response> {
    return this.restService.getRequest('/profil?userID=' + userID);
  }

  /**
   * Ändert das Profil.
   */
  public postChangeProfile(user: User): Observable<Response> {
    return this.restService.postRequest('/profil?sessionkey=' + this.session.sessionkey, user);
  }

  /**
   * Liefert alle von anderen Usern erhaltene Ratings zurück.
   */
  public getBewertungen(userID: number): Observable<Response> {
    return this.restService.getRequest('/bewertungen?sessionkey=' + this.session.sessionkey + '&userID=' + userID);
  }

  /**
   * Erstellt eine Bewertung von einem Fahrer für einen Mitfahrer.
   */
  public putBewertenAlsFahrer(bewertung: Bewertung): Observable<Response> {
    return this.restService.putRequest('/bewertungen?sessionkey=' + this.session.sessionkey, {
      userID: bewertung.mitfahrer ? bewertung.mitfahrer.userID : null,
      rating: bewertung.rating,
      ratingText: bewertung.ratingText
    });
  }

  /**
   * Erstellt eine Bewertung von einem Mitfahrer für einen Fahrer.
   */
  public putBewertenAlsMitfahrer(bewertung: Bewertung): Observable<Response> {
    return this.restService.putRequest('/bewertungen?sessionkey=' + this.session.sessionkey, {
      userID: bewertung.fahrer ? bewertung.fahrer.userID : null,
      rating: bewertung.rating,
      ratingText: bewertung.ratingText
    });
  }
  //#endregion
}
