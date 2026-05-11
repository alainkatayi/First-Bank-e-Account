import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Request } from '../../../core/models/request';
import { environment } from '../../../environnemnt/env';
import { RequestService } from '../../../core/services/request/request.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-request-detail',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css'
})
export class RequestDetailComponent {
  request!: Request
  requestId!: number
  url = environment.url_img
  showDecisionModal = false;
  selectedDecisionType: 'approved' | 'rejected' | null = null;
  motivation: string = '';
  isSubmitting = false;
  show_toast: Boolean = false
  toastType: 'success' | 'error' = 'success'
  toastMessage: string = ''

  constructor(private request_service: RequestService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.requestId = +this.route.snapshot.paramMap.get('id')!
    this.loadRequest()
  }

  loadRequest() {
    this.request_service.loadRequestById(this.requestId).subscribe({
      next: (response) => {
        this.request = response
        console.log(response)
        console.log(response.document[0].file_url)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  openDecisionModal(type: 'approved' | 'rejected') {
    this.selectedDecisionType = type;
    this.motivation = '';
    this.showDecisionModal = true;
  }
  submitDecision() {
    if (!this.motivation || !this.selectedDecisionType) return;

    this.isSubmitting = true;
    const data = {
      decision_type: this.selectedDecisionType,
      motivation: this.motivation,
      request: this.requestId
    };

    this.request_service.requestDecision(this.requestId, data).subscribe({
      next: () => {
        this.show_toast = true
        this.toastType = 'success'
        this.toastMessage = 'Décision enregistrée avec succès'
        this.isSubmitting = false;
        setTimeout(() => {
          this.show_toast = false
          this.showDecisionModal = false;
          this.loadRequest();

        }, 2000)
      },
      error: () => {
        this.show_toast = true
        this.toastType = 'error'
        this.toastMessage = 'Erreur lors de l\'enregistrement'
        this.isSubmitting = false;
        setTimeout(() => {
          this.show_toast = false
          this.showDecisionModal = false;

        }, 2000)
      }
    });
  }
}
