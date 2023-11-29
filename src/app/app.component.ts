import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CharlistComponent } from './shared/components/charlist/charlist.component';

import { HomeComponent } from './shared/pages/home/home.component';
import { ShinyColorsSfpAPIService } from './service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { UtilityService } from './service/utility/utility.service';
import { BrowserModule } from '@angular/platform-browser';
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
