import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  username:string | undefined
  email:string |undefined
  private router = inject(Router)
  constructor(private stock_user_service: LoginService){}
  ngOnInit(){
    this.username = this.stock_user_service.get_user_local()?.user.username
    this.email = this.stock_user_service.get_user_local()?.user.email
  }

  logOut(){
    this.stock_user_service.logOut()
    this.router.navigate(['/login'])

  }
}
