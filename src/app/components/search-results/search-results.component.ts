import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{
filteredResults : any[] = [];
searchTriggered = false;
public data:any;
public closed:boolean=true;
  constructor(private search:SearchService)
  {


  }
  ngOnInit(): void {
  
    this.search.searchTriggered$.subscribe((triggered) => {
    this.searchTriggered = triggered;
     this.closed=triggered;
  });
this.search.searchQuery$.subscribe((results) => {
    this.filteredResults = results;


  

  });






} close(): void
{

  this.search.closedTriggered$.subscribe((triggered) => {
   this.closed=triggered;
  });


}}
