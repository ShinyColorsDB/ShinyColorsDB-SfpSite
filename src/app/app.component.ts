import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [

  ],
  imports: [
    SidebarComponent,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShinyColorsDB-SfpSite';
}
