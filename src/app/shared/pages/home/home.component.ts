import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';

import { ShinyColorsSfpMetaService } from '../../../service/shinycolors-sfp-meta/shiny-colors-meta.service';

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
export class HomeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private scSfpMetaService: ShinyColorsSfpMetaService,
  ) {

  }

  ngOnInit(): void {
    this.scSfpMetaService.getDefaultMeta().forEach((e) => {
      if (this.meta.getTag(`name="${e.name}"`) == null) {
        this.meta.addTag(e);
      }
      else {
        this.meta.updateTag(e);
      }
    });
  }
}
