import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private urlApi = 'https://p22jsybjj9.execute-api.us-east-1.amazonaws.com/Stage/api/v1/users'
    private urlInformApi = 'https://p22jsybjj9.execute-api.us-east-1.amazonaws.com/Stage/api/v1/informs'
    // private urlInformApi = 'http://localhost:8081/api/v1/informs'

    constructor(private http: HttpClient) {}

    public findAll(status: string): Observable<any> {
        const params = new HttpParams().set('status', status);
        return this.http.get<any>(this.urlApi, {params})
    }

    public findInforms(status: string): Observable<any> {
        const params = new HttpParams().set('status', status);
        return this.http.get<any>(this.urlInformApi, {params})
    }

    public findInform(informId: string): Observable<any> {
        const urlFinal = `${this.urlInformApi}/${informId}`;
        return this.http.get<any>(urlFinal)
    }

    public find(userId: string): Observable<any> {
        const urlFinal = `${this.urlApi}/${userId}`;
        return this.http.get<any>(urlFinal)
    }

    update(id: string, status: string): Observable<any> {
        const url = `${this.urlApi}/status/${id}`;
        const params = new HttpParams().set('status', status.toString());
        return this.http.get<any>(url, {params});
    }

    updateInform(userId: string, status: string): Observable<any> {
        const url = `${this.urlInformApi}/status/${userId}`;
        const params = new HttpParams().set('status', status.toString());
        return this.http.get<any>(url, {params});
    }

}
