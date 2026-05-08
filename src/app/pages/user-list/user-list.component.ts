import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { User } from '../../../core/models/user';
import { environment } from '../../../environnemnt/env';
import { UserService } from '../../../core/services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [SidebarComponent,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
    users!: User []
    url = environment.url
    page_size = 10
    current_page = 1
    next_page_url: string | null = null
    prev_page_url: string | null = null
    total_count = 0
    is_loading: Boolean = false
  
    constructor(private user_service: UserService) { }
  
    ngOnInit() {
      this.loadRequests()
    }
    loadRequests(page: number = 1) {
      this.is_loading = true
      this.current_page = page
      this.user_service.loadUser(page, this.page_size).subscribe({
        next: (response) => {
          this.users = response.results
        },
        error: (error) => {
          this.is_loading = false
          console.log(error)
  
        }
      })
    }
}
