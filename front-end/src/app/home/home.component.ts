import { Component } from '@angular/core';
import { TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
