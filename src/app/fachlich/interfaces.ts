//#region Rest-Response
export interface Response {
    success?: boolean;
    message?: string;
    data?: any;
    code?: number;
}
//#endregion

//#region Account
export interface RegisterDTO {
    username?: string;
    password?: string;
}

export interface LoginDTO {
    username?: string;
    password?: string;
}

export interface ChangePasswordDTO {
    old?: string;
    new?: string;
}

export interface Session {
    sessionkey?: string;
    userID?: number;
}
//#endregion

//#region User
export interface User {
    userID?: number;
    username?: string;
    vorname?: string;
    nachname?: string;
    alter?: number;
    pkw?: string;
    beschreibung?: string;
}

export interface Mitfahrer extends User {
    umweg?: number;
    start?: any;
    ziel?: any;
}

export interface Bewertung {
    ratingID?: number;
    reiseID: number;
    fahrer?: User;
    mitfahrer?: User;
    rating?: number;
    ratingText?: String;
}
//#endregion

//#region Reise
export interface Reise {
    reiseID?: number;
    fahrer?: User;
    mitfahrer?: Mitfahrer[];
    start?: any;
    ziel?: any;
    zeitstempel?: number;
    plaetzeMax?: number;
    platzeFrei?: number;
    preis?: number; // in Cent
    beschreibung?: string;
    umwegMax?: number; // SOLL --> angeben, KANN --> berechnen, überprüfen
}

export interface ReiseDatum extends Reise {
    datum?: string;
    reisedauer?: string;
}

export interface Route {
    start?: string;
    ziel?: string;
    zeitstempel?: number;
}
//#endregion

//#region Inbox
export interface Chat {
    user?: User;
    chatPartner?: User;
    messages?: Message[];
}

export interface Message {
    message?: string;
    zeitstempel?: number;
    receiverID?: number;
    reiseID?: number; // -1 --> normale Nachricht, >= 0 --> Anfrage zu einer Reise
}
//#endregion
