import { Component } from '@angular/core';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.sass'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  contactDetails = [
    { label: 'contact.phone', value: '+7 (777) 123 45 67' },
    { label: 'contact.email', value: 'lonbard@3sc.kz' },
    { label: 'contact.address', value: 'г. Алматы, ул. Толе би 23А, 2 этаж, 211 кабинет' }
  ];
  submitForm() {
    console.log('Form submitted:', this.formData);
    // API
  }


}
