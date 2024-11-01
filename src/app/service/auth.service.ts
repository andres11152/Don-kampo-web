import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaz para la respuesta de registro
interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
}

// Interfaz para la respuesta de inicio de sesión
interface LoginResponse {
  success: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // URL de tu backend Node.js
  private tokenKey = 'authToken';  // Llave para el token en la cookie

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  // Guardar token en la cookie
  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token);
  }

  // Obtener el token desde la cookie
  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }

  // Eliminar el token de la cookie (Logout)
  logout(): void {
    this.cookieService.delete(this.tokenKey);
  }

  // Verificar si el usuario está autenticado
  get isAuthenticated(): boolean {
    return this.cookieService.check(this.tokenKey);
  }

  // Método para iniciar sesión con email y contraseña
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        catchError(this.handleError)  // Manejo de errores centralizado
      );
  }

  // Método para registrar un nuevo usuario
  register(userData: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/api/createusers`, userData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores centralizado
      );
  }

  // Método para enviar un correo de restablecimiento de contraseña
  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email })
      .pipe(
        catchError(this.handleError)  // Manejo de errores centralizado
      );
  }

  // Método para manejar los errores HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // Aquí puedes emitir mensajes más detallados o realizar otras acciones según el error
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // Obtener un mensaje de error amigable según el código de error
  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'user-not-found':
        return 'Usuario no encontrado. Por favor revisa tu correo electrónico o regístrate.';
      case 'wrong-password':
        return 'Contraseña incorrecta. Por favor intenta de nuevo.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      default:
        return 'Ocurrió un error. Inténtalo de nuevo más tarde.';
    }
  }
}
