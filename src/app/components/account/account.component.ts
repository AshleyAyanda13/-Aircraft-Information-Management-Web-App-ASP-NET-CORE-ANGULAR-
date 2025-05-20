import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router'; // Import Router
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  response: any; // Removed unnecessary type declaration
constructor(private apiService: ApiServiceService, private router: Router) { } // Removed unnecessary imports and constructor parameters


ngOnInit(): void {




    this.apiService.getLoggedinUser().subscribe({
      next: (response) => {

          this.response = response; // Store the response in a class property
          
        
       
       
      },
      error: (err) => {
        if (err.error) {
         
          console.log('Error response:', err.error);
        }
      }
    });


}



onLogout():void
{

 
localStorage.removeItem("jwtToken");
   this.router.navigate(['/loginn']); // Navigate to the home page on successful login
}


}


