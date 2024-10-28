import {Injectable} from '@angular/core';
import {HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private urlApi = 'https://'
   

    constructor(private http: HttpClient) {}

    public get(url: string, params?: HttpParams): Observable<any> {
        return this.http.get(this.urlApi + url, {
            params: params
        });
    }

    public post(url: string, body: any): Observable<any> {
        return this.http.post(this.urlApi + url, body);
    }

    public put(url: string, body: any): Observable<any> {
        return this.http.put(this.urlApi + url, body);
    }

    public delete(url: string, body: any): Observable<any> {
        return this.http.delete(this.urlApi + url, body);
    }

}
