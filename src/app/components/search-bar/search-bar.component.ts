import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { BehaviorSubject, timer } from 'rxjs';



@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
showValidationErrors = false; 
 
filteredResults: any[] = []; // Declaring it as a class member
 SearchForm = new FormGroup({
  
  SearchString: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(private apiService: ApiServiceService, private searchService:SearchService) {} // Inject Router
dataholder:any;
  
 searchTriggered = false;

  onSearch():void
  {
this.showValidationErrors=true;
if (this.SearchForm.invalid) {
  this.SearchForm.markAllAsTouched();

  timer(5000).subscribe(() => {
this.showValidationErrors=false;
  });

  return;
}
      this.searchService.triggerSearch();
const payload = {
      query: this.SearchForm.value.SearchString
    };


    this.apiService.getSearchInventoryData(payload.query).subscribe({
      next: (response) => {
  this.showValidationErrors = false;
  this.searchService.updateSearch(Array.isArray(response) && response.length ? response : []);


      },
      error: (err) => {
        console.error('Error fetching search results:', err);
      }
    });
     




  }
}
