import { Component } from '@angular/core';
import { InventoryComponent } from '../../components/inventory/inventory.component';
@Component({
  selector: 'app-inventorypage',
  standalone: true,
  imports: [InventoryComponent],
  templateUrl: './inventorypage.component.html',
  styleUrl: './inventorypage.component.css'
})
export class InventorypageComponent {

}
