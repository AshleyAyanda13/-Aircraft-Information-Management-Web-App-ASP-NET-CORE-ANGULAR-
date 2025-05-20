import { Component, Input } from '@angular/core';
import { SuccessMessageService } from '../../services/success-message.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {

 
 successMessage$ = this.successMessageService.successMessage$;

  constructor(private successMessageService: SuccessMessageService){}

  closeMessage() {
    this.successMessageService.clearMessage();
  window.location.href;
  }
}
