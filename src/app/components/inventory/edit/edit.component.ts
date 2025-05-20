import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessMessageService } from '../../../services/success-message.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  positiveNumberPattern = /^[1-9]\d*$/;
  @Input() aircraftIdforedit: number | null = null; // Accept only the ID
  pditingAirCraft: any = null;
 @Output() dataUpdated = new EventEmitter<void>(); 
  aircraftForm = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    AirlineUsage: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Capacity: new FormControl('', [Validators.required, Validators.minLength(1),Validators.pattern(this.positiveNumberPattern)]),
    CruisingSpeed: new FormControl('', [Validators.required, Validators.minLength(2),Validators.pattern(this.positiveNumberPattern)]),
    Manufacturer: new FormControl('', [Validators.required, Validators.minLength(3)]),
    EngineType: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Image: new FormControl('', [Validators.required, Validators.minLength(2)])

  });
 

  constructor(private service: ApiServiceService, private successMessageService :SuccessMessageService) {}

  ngOnInit(): void {
    console.log(this.aircraftIdforedit);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['aircraftIdforedit'] && this.aircraftIdforedit) {
      this.ReadId(this.aircraftIdforedit);
     
    }
  }

  ReadId(id: number) {
    console.log("Fetching Aircraft Data for ID: " + id);

    this.service.getInventoryDatawithId(id).subscribe({
      next: (response) => {
        this.pditingAirCraft = response;

        // Ensure the form is updated dynamically when data is received
        this.aircraftForm.patchValue({
          Name: this.pditingAirCraft?.Name || '',
          Description: this.pditingAirCraft?.Description || '',
          Capacity:this.pditingAirCraft?.Capacity|| '',
          AirlineUsage: this.pditingAirCraft?.AirlineUsage || '',
          Manufacturer:this.pditingAirCraft?.Manufacturer|| '',
          EngineType: this.pditingAirCraft?.EngineType || '',
          Image:this.pditingAirCraft?.Image|| '',
          CruisingSpeed: this.pditingAirCraft?.CruisingSpeed || ''

        });
      },
      error: (err) => {
        console.log('Error response:', err);
      }
    });
  }

  Update(id: any): void {
    console.log("Update clicked for ID: " + id);

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

    this.service.postEditData(id, payload).subscribe({
      next: (response) => {
        this.pditingAirCraft = response;
        console.log("Successfully updated aircraft.");
 this.dataUpdated.emit(); //
        this.pditingAirCraft=null;
         this.successMessageService.setMessage("Successfully edited aircraft.");
         

      },
      error: (err) => {
        console.log('Error response:', err);
      }
    });
  }
}