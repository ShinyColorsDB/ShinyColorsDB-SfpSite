import { Component, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
  host: {
    class: "col-xxl-10 col-lg-9 col-md-7 col-sm-12 overflow-auto vh-100"
  }
})
export class NotfoundComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    //@Optional() @Inject(RESPONSE) private response: Response
  ) {
    if (isPlatformServer(this.platformId)) {
      //this.response.status(404);
    }
  }
}
