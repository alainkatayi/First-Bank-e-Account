import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Request } from '../../../core/models/request';
import { environment } from '../../../environnemnt/env';
import { RequestService } from '../../../core/services/request/request.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-detail',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css'
})
export class RequestDetailComponent {
  request!:Request
  requestId!:number
  url = environment.url_img

  constructor(private request_service:RequestService,private route:ActivatedRoute){}
  ngOnInit(){
    this.requestId = +this.route.snapshot.paramMap.get('id')!
    this.loadRequest()
  }

  loadRequest(){
    this.request_service.loadRequestById(this.requestId).subscribe({
    next:(response)=>{
      this.request = response
      console.log(response)
      console.log(response.document[0].file_url)
    },
    error:(error)=>{
      console.log(error)
    }
    })
  }
}
