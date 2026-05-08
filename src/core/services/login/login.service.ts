import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environnemnt/env';
import { LoginData } from '../../models/loginData';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse';
const SESSION_KEY = 'userSession';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl
  constructor( private http: HttpClient ) { }

  store_user_local(data:LoginResponse){
    localStorage.setItem(SESSION_KEY,JSON.stringify(data))
  }

  login(data:LoginData): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}token/`,data)
  }
}
