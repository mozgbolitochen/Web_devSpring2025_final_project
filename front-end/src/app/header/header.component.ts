import { Component } from '@angular/core';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { RouterModule, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService,
    public auth: AuthService,
    private router: Router


  ) {}

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
  handleLogout() {
    this.auth.logout();
    this.router.navigate(['/home']); 
  }
  get username(): string {
    return this.auth.getUsername();
  }

}