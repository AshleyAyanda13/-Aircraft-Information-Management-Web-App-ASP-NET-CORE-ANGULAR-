import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "../../components/home/home.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent  {


  

}
