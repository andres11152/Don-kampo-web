// auth.guard.ts
import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(): boolean {
        if (this.authService.isAuthenticated) {
            console.log("is login true");
            return true;
        } else {
            // If the user is not logged in, redirect to the login page
            console.log("is login false")
            this.router.navigate(['/login']);
            return false;
        }
    }
}
