import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ChangeUserRequest} from '../dto/ChangeUserRequest'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../dto/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUri: string = 'https://bumagi-frontend-test.herokuapp.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('bumagiAuthToken')}`)
    }
    return this.http.get<User[]>(this.usersUri, header);
  }

  getBlockedUsers(): Observable<User[]> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('bumagiAuthToken')}`)
    }
    return this.http.get<User[]>(this.usersUri + '?status=2', header);
  }

  getActiveUsers(): Observable<User[]> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('bumagiAuthToken')}`)
    }
    return this.http.get<User[]>(this.usersUri + '?status=0', header);
  }

  change(changeRequest: ChangeUserRequest, id: number | undefined): Observable<any> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('bumagiAuthToken')}`)
    }
    const url = this.usersUri + '/' + id;
    return this.http.patch<any>(url, changeRequest, header);
  }
}
