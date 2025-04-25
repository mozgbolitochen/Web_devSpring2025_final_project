import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 


interface UserProfile {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  userData: UserProfile = { 
    username: '',
    first_name: '',
    last_name: '',
    email: '' 
  };
  
  editData: UserProfile = { 
    username: '',
    first_name: '',
    last_name: '',
    email: '' 
  };

  isEditing = false;
  isLoading = true;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProfile();
  }
  

  loadProfile() {
    this.isLoading = true;
    // Моковая реализация 
    // setTimeout(() => {
    //   this.userData = {
    //     name: this.auth.getUsername(),
    //     email: 'user@example.com'
    //   };
    //   this.isLoading = false;
    // }, 1000);
    
    // Реальная реализация
    this.api.getProfile().subscribe({
      next: (data: UserProfile) => {
        this.userData = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  startEditing() {
    this.editData = { ...this.userData };
    this.isEditing = true;
  }

  saveChanges() {
    // Моковая реализация
    // this.userData = { ...this.editData };
    // this.isEditing = false;
    
    // Реальная реализация:
    this.api.updateProfile(this.editData).subscribe({
      next: (updatedData: UserProfile) => {
        this.userData = { ...this.editData };
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Failed to update profile', err);
      }
    });
  }
  resetEditData() {
    this.editData = { ...this.userData };
  }

  cancelEditing() {
    this.isEditing = false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}