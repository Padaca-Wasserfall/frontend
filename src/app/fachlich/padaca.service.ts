import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Reise, User, Route, LoginDTO, ChangePasswordDTO, RegisterDTO, Message } from './interfaces';
import { RestService } from '../technisch/rest.service';

@Injectable()
export class PadacaService {

  constructor(private restService: RestService) { }

  //#region Home 
  public getBeschreibungHome(): Observable<Response> {
    return this.restService.getRequest('/home');
  }
  //#endregion

  //#region Account
  /**
   * Liefert die Session des Users zurück.
   */
  public postLogin(dto: LoginDTO): Observable<Response> {
    return this.restService.postRequest('/login', dto);
  }

  /**
   * Verwirft die Session.
   */
  public logout(): Observable<Response> {
    return this.restService.postRequest('/logout', {});
  }

  /**
   * Führt den Registrierungsprozess für einen User aus.
   */
  public register(dto: RegisterDTO): Observable<Response> {
    return this.restService.postRequest('/register', dto);
  }

  /**
   * Ändert das Passwort eines Users.
   */
  public changePassword(dto: ChangePasswordDTO): Observable<Response> {
    return this.restService.postRequest('/changePassword', dto);
  }
  //#endregion

  //#region Inbox
  /**
   * Liefert alle Chatpartner eines Users zurück.
   */
  public getChatPartner(): Observable<Response> {
    return this.restService.getRequest('/chat/partner');
  }

  /**
   * Liefert das Chat-Objekt zu einem Chatpartner zurück, dass alle Nachrichten enthält.
   */
  public getChat(chatPartner: User): Observable<Response> {
    return this.restService.getRequest('/chat?userID=' + chatPartner.userID);
  }

  public sendMessage(message: Message): Observable<Response> {
    return this.restService.postRequest('/chat/message', message);
  }
  //#endregion

  //#region Reise
  /**
   * Liefert alle Reisen eines Users als Fahrer zurück.
   */
  public getReisenAlsFahrer(user: User): Observable<Response> {
    return this.restService.getRequest('/reisen/fahrer?userID=' + user.userID);
  }

  /**
   * Liefert alle Reisen eines Users als Mitfahrer zurück.
   */
  public getReisenAlsMitfahrer(user: User): Observable<Response> {
    return this.restService.getRequest('/reisen/mitfahrer?userID=' + user.userID);
  }

  /**
   * Liefert alle möglichen Mitfahrgelegenheiten für die geplante Route.
   */
  public postSucheReise(route: Route): Observable<Response> {
    return this.restService.postRequest('/reisen/suchen', route);
  }

  /**
   * Liefert die entsprechende Reise zurück.
   */
  public getReise(reise: Reise): Observable<Response> {
    return this.restService.getRequest('/reise?reiseID=' + reise.reiseID);
  }

  /**
   * Erstellt eine Reise.
   */
  public postReiseErstellen(reise: Reise): Observable<Response> {
    return this.restService.postRequest('/reise/erstellen', reise);
  }

  /**
   * Fragt bei dem Fahrer an, ob man mitfahren darf.
   */
  public postMitfahrtAnfragen(reise: Reise): Observable<Response> {
    return this.restService.postRequest('/reise/mitfahren', reise);
  }

  /**
   * Bestätigt die Anfrage des Users.
   */
  public postMitfahrtBestätigen(reise: Reise, user: User): Observable<Response> {
    return this.restService.postRequest('/reise/mitfahren/submit', {
      reise: reise,
      user: user
    });
  }

  /**
   * Sagt die Reise ab & benachrichtigt die betroffenen Personen.
   */
  public postReiseAbsagen(reise: Reise) {
    return this.restService.postRequest('/reise/absagen', reise);
  }

  /**
   * Speichert die Reise unter den angepinnten Reisen.
   */
  public putPinned(reise: Reise): Observable<Response> {
    return this.restService.putRequest('/pinned', reise);
  }

  /**
   * Löscht die Reise aus den angepinnten Reisen.
   */
  public deletePinned(reise: Reise): Observable<Response> {
    return this.restService.deleteRequest('/pinned?reiseID=' + reise.reiseID);
  }
  //#endregion

  //#region Profil
  /**
   * Liefert den entsprechenden User mit allen Infos zurück.
   */
  public getUser(user: User): Observable<Response> {
    return this.restService.getRequest('/profil/user?userID=' + user.userID);
  }

  /**
   * Ändert das Profil.
   */
  public postChangeProfile(user: User): Observable<Response> {
    return this.restService.postRequest('/profil/change', user);
  }

  /**
   * Liefert alle von anderen Usern erhaltene Ratings zurück.
   */
  public getErhalteneErhalten(user: User): Observable<Response> {
    return this.restService.getRequest('/rating/erhalten?userID=' + user.userID);
  }

  /**
   * Liefert alle für andere User abgegebenen Ratings zurück.
   */
  public getRatingAbgegeben(user: User): Observable<Response> {
    return this.restService.getRequest('/rating/abgegeben?userID=' + user.userID);
  }
  //#endregion
}
