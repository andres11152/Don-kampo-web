import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://localhost:8080';  // Cambia esta URL según la ubicación de tu servidor

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  public getUsers(): Observable<any> {
    return this.http.get(`${this.urlApi}/api/users`);
  }

  // Obtener usuario por ID
  public getUserById(id: string): Observable<any> {
    return this.http.get(`${this.urlApi}/api/users/${id}`);
  }

  // Crear usuario
  public createUser(user: any): Observable<any> {
    return this.http.post(`${this.urlApi}/api/createusers`, user);
  }

  // Actualizar usuario por ID
  public updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.urlApi}/api/users/${id}`, user);
  }

  // Eliminar usuario por ID
  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.urlApi}/api/deleteusers/${id}`);
  }
}
