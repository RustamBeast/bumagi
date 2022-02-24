import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LoginRequest} from '../dto/LoginRequest';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUri: string = 'https://bumagi-frontend-test.herokuapp.com/auth';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(this.authUri, loginRequest, {observe: 'response'});
  }

}
