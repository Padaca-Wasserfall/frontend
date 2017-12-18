// Rest-Response
export interface Response {
    success: boolean;
    message: string;
    data: any;
}

//#region Account
export interface RegisterDTO {
    username: string;
    password: string;
}

export interface LoginDTO {
    username: string;
    password: string;
}

export interface ChangePasswordDTO {
    old: string;
    new: string;
}

export interface Session {
    user: User;
}
//#endregion

//#region User
export interface User {
    userID: number;
    username: string;
    vorname: string;
    nachname: string;
    alter: number;
    pkw: string;
    beschreibung: string;
}

export interface Mitfahrer extends User {
    umweg: number;
    start: any;
    ziel: any;
}

export interface Bewertung {
    ratingID: number;
    fahrer: User;
    mitfahrer: User;
    rating: number;
    ratingText: number;
}
//#endregion

//#region Reise
export interface Reise {
    reiseID: number;
    fahrer: User;
    mitfahrer: Mitfahrer[];
    start: any;
    ziel: any;
    uhrzeit: any;
    datum: any;
    plaetzeMax: number;
    platzeFrei: number;
    preis: number;
    beschreibung: string;
    umwegMax: number; // SOLL --> angeben, KANN --> berechnen, überprüfen
}

export interface Route {
    start: string;
    ziel: string;
    datum: any;
}
//#endregion

//#region Inbox
export interface Chat {
    user: User;
    chatPartner: User;
    messages: Message[];
}

export interface Message {
    message: string;
    zeit: any;
    reveiverID: number;
}
//#endregion