import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
 import { ApiServiceService } from '../../../services/api-service.service';
  import { CommonModule } from '@angular/common';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SuccessMessageService } from '../../../services/success-message.service';



  
@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
    @Input() aircraftIdforDelete: number | null = null; // Accept only the ID
    pditingAirCraft: any = null;
  @Output() dataUpdated = new EventEmitter<void>(); 







    loginForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      Description: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  
    constructor(private service: ApiServiceService,private successService:SuccessMessageService,private cdr: ChangeDetectorRef) {}
  
    ngOnInit(): void {
   
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['aircraftIdforDelete'] && this.aircraftIdforDelete) {
        this.ReadId(this.aircraftIdforDelete);
       
      }
       
    }
  
   ReadId(id: number) {
  this.service.getInventoryDatawithId(id).subscribe({
    next: (response) => {
      if (response) {
        this.pditingAirCraft = response;
        this.loginForm.patchValue({
          Name: response.Name || '',
          Description: response.Description || ''
        });
      } else {
        this.pditingAirCraft = null;
        this.loginForm.reset();
      }
    },
    error: (err) => {
      console.log('Error response:', err);
    }
  });
}
  
    Delete(id: any): void {
      
  
     
  
      this.service.Delete(id).subscribe({
        next: (response:any) => {
        
          console.log("Successfully Deleted aircraft.");
   this.dataUpdated.emit(); // N
          this.pditingAirCraft=null;
          this.successService.setMessage("Successfully Deleted Record");
          this.pditingAirCraft = null;
this.loginForm.reset(); 
 this.cdr.detectChanges(); 
       
  
        },
        error: (err:any) => {
          console.log('Error response:', err);
        }
      });
    }
  }

