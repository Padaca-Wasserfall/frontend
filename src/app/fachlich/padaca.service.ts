import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Reise, User, Route, LoginDTO, ChangePasswordDTO, RegisterDTO, Message, Bewertung } from './interfaces';
import { RestService } from '../technisch/rest.service';

@Injectable()
export class PadacaService {

  sessionkey: string;

  constructor(private restService: RestService) { }

  //#region Home 
  public getBeschreibungHome(): Observable<Response> {
    return this.restService.getRequest('/home');
  }
  //#endregion

  //#region Account
  /**
   * Führt den Registrierungsprozess für einen User aus.
   */
  public getRegister(dto: RegisterDTO): Observable<Response> {
    return this.restService.postRequest('/register', dto);
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
    return this.restService.getRequest('/logout?sessionkey=' + this.sessionkey);
  }

  /**
   * Ändert das Passwort eines Users.
   */
  public getChangePassword(dto: ChangePasswordDTO): Observable<Response> {
    return this.restService.getRequest('/password?sessionkey=' + this.sessionkey + '&old=' + dto.old + '&new=' + dto.new);
  }
  //#endregion

  //#region Inbox
  /**
   * Liefert alle Chatpartner eines Users zurück.
   */
  public getChatPartner(): Observable<Response> {
    return this.restService.getRequest('/inbox?sessionkey=' + this.sessionkey);
  }

  /**
   * Liefert das Chat-Objekt zu einem Chatpartner zurück, dass alle Nachrichten enthält.
   */
  public getChat(chatPartner: User): Observable<Response> {
    return this.restService.getRequest('/inbox?sessionkey=' + this.sessionkey + '&userID=' + chatPartner.userID);
  }

  public putSendMessage(message: Message): Observable<Response> {
    return this.restService.putRequest('/inbox?sessionkey=' + this.sessionkey, message);
  }
  //#endregion

  //#region Reise als Fahrer
  /**
   * Erstellt eine Reise.
   */
  public postReiseErstellen(reise: Reise): Observable<Response> {
    return this.restService.postRequest('/reise/erstellen?sessionkey=' + this.sessionkey, reise);
  }

  /**
   * Liefert alle Reisen eines Users als Fahrer zurück.
   */
  public getReisenAlsFahrer(user: User): Observable<Response> {
    return this.restService.getRequest('/reise/fahrer?sessionkey=' + this.sessionkey + '&userID=' + user.userID);
  }

  /**
   * Liefert die entsprechende Reise zurück.
   */
  public getReise(reise: Reise): Observable<Response> {
    return this.restService.getRequest('/reise?reiseID=' + reise.reiseID);
  }

  /**
   * Bestätigt oder verweigert die Anfrage eines Mitfahrers.
   */
  public postMitfahrtBestätigen(reise: Reise, user: User, antwort: boolean): Observable<Response> {
    return this.restService.postRequest('/reise/antwort?sessionkey=' + this.sessionkey
      + '&reiseID=' + reise.reiseID + '&userID=' + user.userID + '&antwort=' + antwort, {});
  }

  /**
   * Sagt die Reise ab & benachrichtigt die betroffenen Personen.
   */
  public postReiseAbsagen(reise: Reise, message: Message) {
    return this.restService.postRequest('/reise/absagen?sessionkey=' + this.sessionkey, message);
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
    return this.restService.getRequest('/reise/mitfahrer?sessionkey=' + this.sessionkey + '&userID=' + user.userID);
  }

  /**
   * Fragt bei dem Fahrer an, ob man mitfahren darf.
   */
  public putReiseAnfragen(reise: Reise): Observable<Response> {
    return this.restService.putRequest('/reise/anfragen?sessionkey=' + this.sessionkey + '&reiseID=' + reise.reiseID, {});
  }

  /**
   * Sagt die Reise ab & benachrichtigt die betroffenen Personen.
   */
  public postReiseAbmelden(reise: Reise, message: Message) {
    return this.restService.postRequest('/reise/abmelden?sessionkey=' + this.sessionkey + '&reiseID=' + reise.reiseID, message);
  }
  //#endregion

  //#region Pinned
  /**
   * Speichert die Reise unter den angepinnten Reisen.
   */
  public getPinned(reise: Reise): Observable<Response> {
    return this.restService.getRequest('/pinned?sessionkey=' + this.sessionkey + '&reiseID=' + reise.reiseID);
  }

  /**
   * Speichert die Reise unter den angepinnten Reisen.
   */
  public putPinned(reise: Reise): Observable<Response> {
    return this.restService.putRequest('/pinned?sessionkey=' + this.sessionkey + '&reiseID=' + reise.reiseID, {});
  }

  /**
   * Löscht die Reise aus den angepinnten Reisen.
   */
  public deletePinned(reise: Reise): Observable<Response> {
    return this.restService.deleteRequest('/pinned?sessionkey=' + this.sessionkey + '&reiseID=' + reise.reiseID);
  }
  //#endregion

  //#region Profil
  /**
   * Liefert den entsprechenden User mit allen Infos zurück.
   */
  public getUser(user: User): Observable<Response> {
    return this.restService.getRequest('/profil?sessionkey=' + this.sessionkey + '&userID=' + user.userID);
  }

  /**
   * Ändert das Profil.
   */
  public postChangeProfile(user: User): Observable<Response> {
    return this.restService.postRequest('/profil?sessionkey=' + this.sessionkey, user);
  }

  /**
   * Liefert alle von anderen Usern erhaltene Ratings zurück.
   */
  public getBewertungen(user: User): Observable<Response> {
    return this.restService.getRequest('/bewertungen?sessionkey=' + this.sessionkey + '&userID=' + user.userID);
  }

  /**
   * Erstellt eine Bewertung von einem Fahrer für einen Mitfahrer.
   */
  public putBewertenAlsFahrer(bewertung: Bewertung): Observable<Response> {
    return this.restService.putRequest('/bewertungen?sessionkey=' + this.sessionkey, {
      userID: bewertung.mitfahrer ? bewertung.mitfahrer.userID : null,
      rating: bewertung.rating,
      ratingText: bewertung.ratingText
    });
  }

  /**
   * Erstellt eine Bewertung von einem Mitfahrer für einen Fahrer.
   */
  public putBewertenAlsMitfahrer(bewertung: Bewertung): Observable<Response> {
    return this.restService.putRequest('/bewertungen?sessionkey=' + this.sessionkey, {
      userID: bewertung.fahrer ? bewertung.fahrer.userID : null,
      rating: bewertung.rating,
      ratingText: bewertung.ratingText
    });
  }
  //#endregion
}
