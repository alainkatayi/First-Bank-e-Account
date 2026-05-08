import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../core/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  is_connecting: Boolean = false
  show_toast: Boolean = false
  toastType: 'success' | 'error' = 'success'
  toastMessage: string = ''
  private router = inject(Router);


  constructor(private fb: FormBuilder, private loginService: LoginService, private local_storage: LoginService){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.is_connecting = true
      const data = this.loginForm.value
      this.loginService.login(data).subscribe({
        next:(response) =>{
          this.local_storage.store_user_local(response)
          this.is_connecting = false
          this.show_toast = true
          this.toastType = 'success'
          this.toastMessage = 'Connexion réussie'
          setTimeout(() => {
            this.show_toast = false
            this.router.navigate(['/'])
          }, 2000)
        },
        error: (error) => {
          this.is_connecting = false
          this.show_toast = true
          this.toastType = 'error'
          this.toastMessage = "Nom d'utilisateur ou mot de passe incorrect"
          console.error('Login failed', error);
          setTimeout(() => {
            this.show_toast = false
          }, 2000)
        }
        

      })
    }
    else {
      console.error("Formulaire invalide");
      this.show_toast = true
      this.toastType = 'error'
      this.toastMessage = 'Veuillez remplir tous les champs obligatoires.'
      setTimeout(() => {
        this.show_toast = false
      }, 2000);
    }
  }
}
