import {BreakpointObserver} from '@angular/cdk/layout';
import {
    ChangeDetectorRef,
    Component, OnInit,
    ViewChild,
} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from "@angular/router";
import {AuthService} from "./service/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    isMobile = true;

    constructor(
        private router: Router,
        private observer: BreakpointObserver,
        private authService: AuthService) {
    }

    isLoggedIn(): boolean {
        if(this.router.url == '/login'){
            return false;
        }else{
            return this.authService.isAuthenticated;
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    ngOnInit() {
        this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
            this.isMobile = screenSize.matches;
        });
    }

    redirectToOtherPage(link: string) {
        this.router.navigate([link]);
    }

}
