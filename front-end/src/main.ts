import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';
// import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { ContactComponent } from './app/contact/contact.component';
import { LoginComponent } from './app/login/login.component';
import { HeaderComponent } from './app/header/header.component'
import { FooterComponent } from './app/footer/footer.component'


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
