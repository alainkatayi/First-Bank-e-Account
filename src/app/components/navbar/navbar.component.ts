import { Router } from '@angular/router';
import { LoginService } from './../../../core/services/login/login.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
