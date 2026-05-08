import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environnemnt/env';
import { UserPagination } from '../../models/pagination';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.url
  constructor( private http: HttpClient,private stock_user_service: LoginService ) { }

  loadUser(page:number = 1, page_size = 10):Observable<UserPagination>{
  const headers = this.stock_user_service.getAuthHeaders()
  let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', page_size.toString())
  return this.http.get<UserPagination>(`${this.apiUrl}accounts/index`, {params, headers})
  }

  createUser(data:FormData):Observable<User>{
    const headers = this.stock_user_service.getAuthHeaders()
        return this.http.post<User>(this.apiUrl +'accounts/register/', data, {headers})
  }
}
