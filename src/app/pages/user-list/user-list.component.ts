import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { User } from '../../../core/models/user';
import { environment } from '../../../environnemnt/env';
import { UserService } from '../../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userForm: FormGroup;
  is_creating: Boolean = false
  show_toast: Boolean = false
  toastType: 'success' | 'error' = 'success'
  toastMessage: string = ''
  users!: User[]
  url = environment.url
  page_size = 10
  current_page = 1
  next_page_url: string | null = null
  prev_page_url: string | null = null
  total_count = 0
  is_loading: Boolean = false
  showModal: Boolean = false;

  constructor(private user_service: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
   }

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

  toggleModal() {
    this.showModal = !this.showModal;
  }

    onSubmit() {
    if (this.userForm.valid) {
      this.is_creating = true
      const data = this.userForm.value
      this.user_service.createUser(data).subscribe({
        next: (response) => {
          this.is_creating = false
          this.show_toast = true
          this.toastType = 'success'
          this.toastMessage = 'Création réussie'
          setTimeout(() => {
            this.show_toast=false
            window.location.reload()
          }, 2000)
        },
        error: (error) => {
          this.is_creating = false
          this.show_toast = true
          this.toastType = 'error'
          this.toastMessage = "Une erreur est survenue lors de la création de cet utilisateur"
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
