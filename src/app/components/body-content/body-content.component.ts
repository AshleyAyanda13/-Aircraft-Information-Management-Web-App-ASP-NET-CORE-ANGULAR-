import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessary modules
import { SearchService } from '../../services/search.service';
import { RouterOutlet } from '@angular/router';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-body-content',
  standalone: true, // Mark as a standalone component
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.css'],
  imports: [CommonModule,RouterOutlet,SearchResultsComponent] // Import required modules directly
})
export class BodyContentComponent implements OnInit {
 


  constructor(private searchService: SearchService) {}

  ngOnInit(): void {


  }
}