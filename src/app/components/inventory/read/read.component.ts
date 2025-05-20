import { ChangeDetectorRef, Component, Injectable, Input, OnInit, SimpleChanges } from '@angular/core';
import { InventoryComponent } from '../inventory.component';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../../services/api-service.service';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})

export class ReadComponent implements OnInit {
  @Input() aircraftId: number | null = null; // Accept only the ID
pditingAirCraft : any = null;


constructor(private service: ApiServiceService,) { } 
  ngOnInit(): void {
    console.log(this.aircraftId);
  }
    


   ngOnChanges(changes: SimpleChanges) {
    if (changes['aircraftId'] && this.aircraftId) {
      this.ReadId(this.aircraftId); // Fetch aircraft data when ID updates
    }
  }

   ReadId(id:number):void
    {






// Inject the InventoryComponent service
    // Call the service method to get the inventory data by ID

 this.service.getInventoryDatawithId(id).subscribe({
      next: (response) => {
      
       this.pditingAirCraft = response;

      }
      , error: (err) => {
        console.log('Error response:', err); // Log the error response
      }
    });
 

    


    }

  }

  


