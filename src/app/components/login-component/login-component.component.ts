import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { ApiServiceService } from '../../services/api-service.service';
import { RouterLink, Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink], // Added ReactiveFormsModule
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  error: string = "";
  constructor(private apiService: ApiServiceService, private router: Router) {} // Inject Router

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const payload = {
      Email: this.loginForm.value.Email,
      Password: this.loginForm.value.Password
    };

    this.apiService.postData(payload).subscribe({
      next: (response) => {
        this.error = "";

        console.log('Response:', response.Message); // Log the response message
       
        localStorage.setItem('jwtToken', response.Token);

        this.router.navigate(['/home']); // Navigate to the home page on successful login
      },
      error: (err) => {
        if (err.error) {
          this.error = "Invalid Login";
          console.log('Error response:', err.error);
        }
      }
    });
  }
}



