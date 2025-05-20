import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from '../../../services/api-service.service';
import { SuccessMessageService } from '../../../services/success-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  aircraftForm: FormGroup;
    successMessage$ = this.successMessageService.successMessage$;
positiveNumberPattern = /^[1-9]\d*$/;
  constructor(private service: ApiServiceService, private successMessageService: SuccessMessageService) {
    this.aircraftForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      Manufacturer: new FormControl('', [Validators.required, Validators.minLength(3)]) ,
     Description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    AirlineUsage: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Capacity: new FormControl('', [Validators.required, Validators.minLength(1),Validators.pattern(this.positiveNumberPattern)]),
    CruisingSpeed: new FormControl('', [Validators.required, Validators.minLength(2),Validators.pattern(this.positiveNumberPattern)]),
    EngineType: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Image: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }
closeMessage() {
    this.successMessageService.clearMessage();

  }
  
  
@Output() dataUpdated = new EventEmitter<void>(); 

  addAircraft() {
    const payload = {
      Name: this.aircraftForm.value.Name,
      Description: this.aircraftForm.value.Description,
      Capacity:this.aircraftForm.value.Capacity,
      Image:this.aircraftForm.value.Image,
      CruisingSpeed:this.aircraftForm.value.CruisingSpeed,
      AirlineUsage:this.aircraftForm.value.AirlineUsage,
      Manufacturer:this.aircraftForm.value.Manufacturer,
      EngineType:this.aircraftForm.value.EngineType
    };

  
    this.service.postInventoryData(payload).subscribe({
      next: (response: any) => {
        console.log("Successfully added aircraft.");

        this.successMessageService.setMessage("Successfully added aircraft.");
            setTimeout(() => {
  
        this.dataUpdated.emit(); // Notify parent to refresh table
      }, 100);
        
      },
      error: (err: any) => {
        console.log('Error response:', err);
      }
    });
  }
}