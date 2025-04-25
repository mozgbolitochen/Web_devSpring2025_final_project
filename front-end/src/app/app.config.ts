import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay} from '@angular/platform-browser';
import { HttpClientModule, HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt.interceptor'; 

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([jwtInterceptor]) 
      ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
  ],
};
