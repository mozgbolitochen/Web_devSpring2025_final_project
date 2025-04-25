import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,  
  imports: [FormsModule, CommonModule],  
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';

    if (this.userData.password !== this.userData.confirmPassword) {
        this.errorMessage = 'Пароли не совпадают';
        return;
    }

    this.isLoading = true;

    const { confirmPassword, ...dataToSend } = this.userData;

    this.auth.register(this.userData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']); 
        this.errorMessage =  'htubc';
      },
    error: (err) => {
      this.errorMessage = err.message;
      this.isLoading = false;

      console.error('Registration error', err);
      // this.errorMessage = err.error.message || 'Ошибка регистрации';
    },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
