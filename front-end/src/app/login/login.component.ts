import { Component, inject, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { FormsModule, NgForm} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, TranslateModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';
  loading = false;

  private auth = inject(AuthService);
  private router = inject(Router);
  
  @ViewChild('loginForm') form?: NgForm;
 
  constructor(private translate: TranslateService) {}
   get usernameInvalid() {
    return this.form?.controls['username']?.invalid && 
           this.form?.controls['username']?.touched;
  }

  onSubmit() {

    this.loading = true;
    this.errorMessage = '';
    
    this.auth.login(this.credentials).subscribe(() => {

      // error: (err) => {
      //   this.errorMessage = 'Неверные учетные данные';
      //   this.loading = false;
      // }
      this.router.navigate(['/']); 
    });
  }
}
  
