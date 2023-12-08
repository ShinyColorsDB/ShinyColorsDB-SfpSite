import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';

@Component({
  selector: 'app-card-item',
  standalone: true,
  providers: [
    ShinyColorsSfpUrlService
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  @Input()
  pathType!: string;

  @Input()
  cardId!: number;

  @Input()
  cardName!: string;

  constructor(
    private scSfpUrlService: ShinyColorsSfpUrlService
  ) { }

  getPictureUrl(): string {
    if (this.pathType === "/pinfo") {
      return this.scSfpUrlService.getProducePictureUrl(this.cardId);
    } else if (this.pathType === "/sinfo") {
      return this.scSfpUrlService.getSupportPictureUrl(this.cardId);
    } else {
      return "";
    }
  }
}
