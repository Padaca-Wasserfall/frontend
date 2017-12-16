import { CanActivate, Router, } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginRouteGuard implements CanActivate {

    constructor(private router: Router) { }

    public canActivate() {
        let session = {};
        if (session) {
            // eingeloggt
            return true;
        } else {
            // nicht eingeloggt
            this.router.navigate(['/login']);
            return false;
        }
    }
}
