import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { catchError, of } from 'rxjs';

import { ShinyColorsSfpAPIService } from '../../../service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';
import { ShinyColorsSfpUtilService } from '../../../service/shinycolors-sfp-util/shiny-colors-util.service';
import { ShinyColorsSfpMetaService } from '../../../service/shinycolors-sfp-meta/shiny-colors-meta.service';

import { CardItemComponent } from '../../components/card-item/card-item.component';

import { CharacterAlbumMetadata, ProduceIdolBrief, SupportCharacterBrief } from '../../interfaces/album';
import { SfpCharacterBasicInfo } from '../../interfaces/profile';


@Component({
  selector: 'app-i-info',
  standalone: true,
  imports: [CommonModule, CardItemComponent],
  templateUrl: './i-info.component.html',
  styleUrl: './i-info.component.css',
  host: {
    class: "col-xxl-10 col-lg-9 col-md-8 col-sm-12 overflow-auto vh-100"
  }
})
export class IInfoComponent implements OnInit {
  idolProfile!: SfpCharacterBasicInfo;
  idolAlbum!: CharacterAlbumMetadata;

  idolId!: number;

  togglePS = true;

  P_3: ProduceIdolBrief[] = [];
  P_2: ProduceIdolBrief[] = [];
  P_1: ProduceIdolBrief[] = [];
  S_SSR: SupportCharacterBrief[] = [];
  S_SR: SupportCharacterBrief[] = [];
  S_R: SupportCharacterBrief[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private scSfpApiService: ShinyColorsSfpAPIService,
    private scSfpUrlService: ShinyColorsSfpUrlService,
    private scSfpUtilService: ShinyColorsSfpUtilService,
    private scSfpMetaService: ShinyColorsSfpMetaService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (!params['idolid']) { return; }
      this.idolId = Number(params['idolid']);

      this.scSfpApiService.getIdolProfile(this.idolId)
        .pipe(catchError(err => {
          this.router.navigate(['/notfound'])
          return of(null);
        }))
        .subscribe((data) => {
          this.idolProfile = data!;

          this.title.setTitle(this.idolProfile.char_name);

          this.scSfpUtilService.emitActiveIdolUnit(this.idolId);
          this.scSfpUtilService.emitMobileTitle(this.idolProfile.char_name);

          this.scSfpMetaService.getIdolMeta(this.idolProfile).forEach(e => {
            if (this.meta.getTag(`name="${e.name}"`) == null) {
              this.meta.addTag(e);
            }
            else {
              this.meta.updateTag(e);
            }
          });

          this.togglePS = true;

          this.categoryReset();

          this.idolProfile.produceIdolBriefs.forEach((card) => {
            switch (card.initialStar) {
              case 3:
                this.P_3.push(card);
                break;
              case 2:
                this.P_2.push(card);
                break;
              case 1:
                this.P_1.push(card);
                break;
            }
          });
          this.idolProfile.supportCharacterBriefs.forEach((card) => {
            switch (card.rarity) {
              case "ssr":
                this.S_SSR.push(card);
                break;
              case "sr":
                this.S_SR.push(card);
                break;
              case "R":
                this.S_R.push(card);
                break;
            }
          });
        });
    });
  }

  categoryReset(): void {
    this.P_3 = [];
    this.P_2 = [];
    this.P_1 = [];
    this.S_SSR = [];
    this.S_SR = [];
    this.S_R = [];
  }

  getIconUrl(): string {
    return this.scSfpUrlService.getBigIdolIconUrl(this.idolId);
  }
}
