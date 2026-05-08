import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  get_user_local():LoginResponse | null {
    if(typeof localStorage === 'undefined'){
      return null
    }
    const data_user = localStorage.getItem(SESSION_KEY)
    return data_user ? JSON.parse(data_user) as LoginResponse : null
  }

  getAuthHeaders():HttpHeaders{
    const user = this.get_user_local()

    return new HttpHeaders({
      Accept :'application/json',
      Authorization : `Bearer ${user?.access}`
    })
  }

  logOut(){
    localStorage.clear()

  }
}
