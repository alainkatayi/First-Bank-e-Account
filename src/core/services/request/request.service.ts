import { Injectable } from '@angular/core';
import { environment } from '../../../environnemnt/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { RequestPagination } from '../../models/pagination';
import { Request } from '../../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = environment.url
  constructor(private http:HttpClient,private stock_user_service: LoginService) { }

  loadRequests(page:number = 1, page_size=10):Observable<RequestPagination>{
    const headers = this.stock_user_service.getAuthHeaders()
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', page_size.toString())
    return this.http.get<RequestPagination>(`${this.apiUrl}request/index`, {params, headers})
  }
  loadRequestById(id:number):Observable<Request>{
    const headers = this.stock_user_service.getAuthHeaders()
    return this.http.get<Request>(`${this.apiUrl}request/${id}`, {headers})
  }
}
