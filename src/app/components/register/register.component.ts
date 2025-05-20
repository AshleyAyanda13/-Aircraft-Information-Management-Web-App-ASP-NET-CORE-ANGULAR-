import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  errors: any = {};
  adderrors: { [key: string]: { description: string } } = {};  // Store validation errors
  description: any ='';
  successMessage: string = ''; // To store the success message
  formSubmitted: boolean = false; // Flag to track form submission

  constructor(private apiService: ApiServiceService, private fb: FormBuilder) {
    console.log(this.adderrors);
  }

  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    
    ]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    validators: this.passwordsMatchValidator
  });

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    this.formSubmitted = true; // Flag to indicate the form has been submitted

    if (this.registrationForm.invalid) {
      return;
    }

    const payload = {
      email: this.registrationForm.value.email,
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      confirmPassword: this.registrationForm.value.confirmPassword
    };

    if (this.registrationForm.value.password === this.registrationForm.value.confirmPassword) {
      delete this.errors.ConfirmPassword; // Remove the ConfirmPassword error
    }
    if (this.registrationForm.value.password !== "") {
      delete this.errors.password;
    }

    this.apiService.postRegistrationData(payload).subscribe({
      next: (response) => {
        this.errors = {}; // Clear errors
        this.adderrors = {};
        this.successMessage = 'Registration successful! Please log in.'; // Set success message
        this.registrationForm.reset(); // Clear the form
        this.formSubmitted = false; // Reset the form submission flag
      },
      error: (err) => {
        console.error('Error:', err.error.errorMessage);

        // Clear previous errors
        this.errors = {};
        this.adderrors = {};

        if (err.error && err.error.errors) {
          // Assign only meaningful errors
          for (const key in err.error.errors) {
            if (err.error.errors[key]) {
              this.errors[key] = err.error.errors[key];
            }
          }
        }

        if (err.error && err.error.errorMessage) {
          this.adderrors = err.error.errorMessage;
        }
      }
    });
  }
}