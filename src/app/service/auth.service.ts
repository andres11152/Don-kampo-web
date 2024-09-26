import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL de tu backend Node.js

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  // Set token in cookie
  setToken(token: string) {
    this.cookieService.set("authToken", token);
  }

  // Login with email and password
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Logout
  logout() {
    this.cookieService.delete('authToken');
  }

  // Check if a user is authenticated
  get isAuthenticated(): boolean {
    return this.cookieService.check("authToken");
  }

  // Send a password reset email (through your backend)
  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email });
  }

  // Handle error messages
  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'user-not-found':
        return 'Usuario no encontrado. Por favor revisa tu correo electrónico o regístrate.';
      case 'wrong-password':
        return 'Contraseña inválida. Inténtalo de nuevo.';
      default:
        return 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.';
    }
  }
}
