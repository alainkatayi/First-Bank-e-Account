import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { environment } from '../../../environnemnt/env';
import { RequestService } from '../../../core/services/request/request.service';
import { Request } from '../../../core/models/request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  requests!: Request []
  url = environment.url
  page_size = 10
  current_page = 1
  next_page_url: string | null = null
  prev_page_url: string | null = null
  total_count = 0
  is_loading: Boolean = false

  statusTranslation: any = {
  'PENDING': 'EN ATTENTE',
  'approved': 'APPROUVÉ',
  'rejected': 'REJETÉ'
};

  constructor(private request_service: RequestService) { }

  ngOnInit() {
    this.loadRequests()
  }
  loadRequests(page: number = 1) {
    this.is_loading = true
    this.current_page = page
    this.request_service.loadRequests(page, this.page_size).subscribe({
      next: (response) => {
        this.requests = response.results
      },
      error: (error) => {
        this.is_loading = false
        console.log(error)

      }
    })
  }
}
