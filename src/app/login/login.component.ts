// login.component.ts

import { Component } from '@angular/core';
import { ApiService } from "../service/api.service";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        FormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email: string = '';
    emailSend: string = '';
    password: string = '';
    errorMessage: string = '';
    loading: boolean = false;
    isShowFormPass: boolean = false;

    constructor(
        private apiServices: ApiService,
        private authService: AuthService,
        private router: Router,
    ) {}

    login() {
        if (this.email.length > 3 && this.password.length > 3) {
            this.loading = true;
            this.authService.login(this.email, this.password)
                .subscribe({
                    next: () => {
                        this.loading = false;
                        this.authService.setToken('success');
                        this.router.navigate(['users']);
                    },
                    error: (error) => {
                        this.loading = false;
                        this.errorMessage = this.authService.getErrorMessage(error.code);
                    }
                });
        } else {
            this.errorMessage = "Debe ingresar un correo electrónico y/o contraseña válidos";
        }
    }

    sendPasswordResetEmail(): void {
        if (this.emailSend.length > 3) {
            this.authService.sendPasswordResetEmail(this.emailSend)
                .subscribe({
                    next: () => {
                        console.log('Correo de recuperación de contraseña enviado correctamente.');
                        this.errorMessage = "Se envió el correo de recuperación de contraseña.";
                    },
                    error: (error) => {
                        console.error('Error al enviar el correo de recuperación de contraseña:', error);
                        this.errorMessage = this.authService.getErrorMessage(error.code);
                    }
                });
        } else {
            this.errorMessage = "Para recuperar la contraseña, por favor ingrese su correo electrónico y presione el botón \"Recuperar contraseña\".";
        }
    }

    showFormPass(): void {
        this.isShowFormPass = !this.isShowFormPass;
    }
}
