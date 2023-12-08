import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: 'col-xxl-10 col-lg-9 col-md-7 col-sm-12 h-100 d-flex',
  }
})
export class HomeComponent {

}
