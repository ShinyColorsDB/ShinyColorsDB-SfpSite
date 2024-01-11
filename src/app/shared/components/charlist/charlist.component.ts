import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

import { Unit } from '../../interfaces/unit';

import { ShinyColorsSfpAPIService } from '../../../service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';
import { ShinyColorsSfpUtilService } from '../../../service/shinycolors-sfp-util/shiny-colors-util.service';

@Component({
  selector: 'app-charlist',
  standalone: true,
  providers: [
    ShinyColorsSfpAPIService
  ],
  imports: [
    CommonModule,
    NgbCollapse,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './charlist.component.html',
  styleUrl: './charlist.component.css'
})
export class CharlistComponent {
  units: Array<Unit> = [];
  collapseStatus: Map<number, boolean> = new Map<number, boolean>();
  currentIdolID: number = 0;
  currentUnitID: number = 0;

  @Input()
  public isBigScreen: boolean = false;

  @Output()
  public idolClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scSfpUtilService: ShinyColorsSfpUtilService,
    private scSfpApiService: ShinyColorsSfpAPIService,
    public scUrlService: ShinyColorsSfpUrlService
  ) {
    this.scSfpApiService.getUnitList().subscribe((data) => {
      this.units = data;
      this.scSfpUtilService.updateUnits(data);
      this.units.forEach(e => {
        this.collapseStatus.set(e.unitId, true);
      });
    });
  }

  ngOnInit(): void {
    this.scSfpUtilService.activeIds.subscribe((data) => {
      [this.currentIdolID, this.currentUnitID] = data;
      this.collapseStatus.set(this.currentUnitID, false);
    });
  }

  onIdolClicked(): void {
    if (isPlatformBrowser(this.platformId) && !this.isBigScreen) {
      this.idolClicked.emit(true);
    }
  }

  getCollapseStatus(unitId: number): boolean {
    return this.collapseStatus.get(unitId) || false;
  }
}
