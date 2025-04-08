import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'guest' // default value
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Here you would typically make an API call to register/login the user
    console.log('Form submitted:', this.user);
    // Navigate to dashboard or home page after successful login
    this.router.navigate(['/dashboard']);
  }
}
