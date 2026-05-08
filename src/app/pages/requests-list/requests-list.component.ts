import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Request } from '../../../core/models/request';
import { environment } from '../../../environnemnt/env';
import { RequestService } from '../../../core/services/request/request.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-requests-list',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent {
  requests!:Request[]
  url = environment.url
  page_size = 10
  current_page = 1
  next_page_url : string | null = null
  prev_page_url : string | null = null
  total_count = 0
  is_loading:Boolean = false

  constructor(private request_service: RequestService){}

  ngOnInit(){
    this.loadRequests()
  }
  loadRequests(page:number=1){
    this.is_loading = true
    this.current_page = page
    this.request_service.loadRequests(page, this.page_size).subscribe({
      next:(response)=>{
        this.requests = response.results
      },
      error:(error)=>{
        this.is_loading = false
        console.log(error)

      }
    })
  }
}
