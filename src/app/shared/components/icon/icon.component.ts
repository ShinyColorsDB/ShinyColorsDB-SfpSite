import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';

import { Idol } from '../../interfaces/idol';


@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {

  /*
  @Input()
  idolInfo!: Idol;

  @Input()
  cardData!: {
    "mstProduceIdolId": number,
    "mlProduceIdolText_Name": string
  }

  @ViewChild('IconCanvas')
  iconCanvas!: ElementRef<HTMLCanvasElement>;

  app!: Application;

  constructor(private scSfpUrlService: ShinyColorsSfpUrlService,) {
    Assets.setPreferences({ crossOrigin: 'anonymous', preferCreateImageBitmap: false });
    Assets.add({
      alias: 'edge_default',
      src: '/assets/test.png'
    })
  }

  ngOnChanges(): void {
    Assets.add({
      alias: `icon_${this.idolInfo.idolId}`,
      src: this.scSfpUrlService.getBigIdolIconUrl(this.idolInfo.idolId)
    });
    this.drawCanvas();
  }

  ngAfterViewInit(): void {
    if (!this.iconCanvas) {
      return;
    }

    this.app = new Application({
      view: this.iconCanvas.nativeElement,
      width: 400,
      height: 400,
      backgroundColor: 0xffffff,
      clearBeforeRender: true
    });

    this.drawCanvas();
  }

  async drawCanvas() {
    if (!this.app || !this.idolInfo) {
      return;
    }

    this.app.stage.removeChildren();

    const icon = new Sprite(await Assets.load(`icon_${this.idolInfo.idolId}`));
    icon.anchor.set(0.5);
    icon.position.set(this.app.screen.width / 2, this.app.screen.height / 2);

    this.app.stage.addChild(icon);
  }
  */
}
