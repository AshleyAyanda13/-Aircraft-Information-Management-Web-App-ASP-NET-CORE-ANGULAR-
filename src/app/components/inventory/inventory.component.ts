import { Component,OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { ReadComponent } from './read/read.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component'; 
import { CreateComponent } from './create/create.component';
import { SuccessMessageService } from '../../services/success-message.service';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReadComponent, EditComponent, DeleteComponent, CreateComponent,SuccessComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {


  constructor(private service: ApiServiceService, private successMessageService: SuccessMessageService) { }
  inventoryItems: any[] = [];

currentComponent: string = ''; 
selectedAircraftId: number | null = null;
selectedAircraftIdforedit: number | null = null;
selectedAircraftIdforDelete: number | null = null;
  success :any=null;
 
  CreateAircraft() {
  
    this.currentComponent = 'create';
    
}
refreshTable(): void {


  this.service.getInventoryData().subscribe((updatedData) => {
    this.inventoryItems= updatedData;
    
    this.currentComponent='';
  });
}
readAircraft(id: number) {
     this.selectedAircraftId = null; // Reset first
  setTimeout(() => {
    this.selectedAircraftId = id; // Then update
  }, 0);
    this.currentComponent = 'read';
}


readforEditAircraft(id: number) {


     this.selectedAircraftIdforedit = null; // Reset first
  setTimeout(() => {
    this.selectedAircraftIdforedit = id; // Then update
  }, 0);
   this.currentComponent = 'edit';
}
readforDelete(id:number)
{


     this.selectedAircraftIdforDelete = null; // Reset first
  setTimeout(() => {
    this.selectedAircraftIdforDelete = id; // Then update
  }, 0);
  this.currentComponent = 'delete';

}
closeCrudComponent()
{

this.currentComponent='';


}



ngOnInit(): void {
  

   this.service.getInventoryData().subscribe({
      next: (response) => {
    console.log(response);
        if(response==null)
        {
          response="Inventory is empty";


        }else
        {
        this.inventoryItems=response;
        }
      }
      , error: (err) => {
        console.log('Error response:', err); // Log the error response
      }
    });



   
}

  

 

}
