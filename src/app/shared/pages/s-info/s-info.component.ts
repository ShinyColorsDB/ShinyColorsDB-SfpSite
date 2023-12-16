import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { catchError, of } from 'rxjs';

import { UtilityService } from '../../../service/utility/utility.service';
import { ShinyColorsSfpAPIService } from '../../../service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';
import { SupportCharacter } from '../../interfaces/common';

@Component({
  selector: 'app-s-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './s-info.component.html',
  styleUrl: './s-info.component.css',
  host: {
    class: "col-xxl-10 col-lg-9 col-md-7 col-sm-12 overflow-auto vh-100 overflow-auto"
  }
})
export class SInfoComponent implements OnInit {

  cardId!: number;

  cardInfo!: SupportCharacter;

  current: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private utilService: UtilityService,
    private scSfpApiService: ShinyColorsSfpAPIService,
    private scSfpUrlService: ShinyColorsSfpUrlService,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cardId = Number(params['cardId']);

      this.scSfpApiService.getSupportInfo(this.cardId)
        .pipe(catchError(err => {
          this.router.navigate(['/notfound'])
          return of(null);
        }))
        .subscribe((data) => {
          if (!data) { return; }

          this.cardInfo = data;

          this.title.setTitle(`${this.cardInfo.mlSupportCharaText_Name} ${this.cardInfo.mlCharacterText_Name}`);
          //this.utilsService.generateIdolMeta(this.idolInfo).forEach(e => {
          //  this.meta.updateTag(e);
          //});

          //this.utilService.emitActiveIds([this.cardInfo.mstIdolId, this.cardInfo.mstUnitId]);
          //this.utilsService.emitMobileTitle(this.idolInfo.idolName);

        });
    });
  }

  getPictureUrl(): string {
    return this.scSfpUrlService.getSupportPictureUrl(this.cardInfo.mstSupportCharacterId);
  }

  getEmptyArray(s: number): number[] {
    return new Array(s);
  }

  getDate(s: string): string {
    return new Date(Number(s) * 1000).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-');
  }
}
