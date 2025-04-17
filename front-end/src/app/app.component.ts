import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { TranslateService, TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'front-end';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('kz');
    this.translate.use('kz');
  }

}
