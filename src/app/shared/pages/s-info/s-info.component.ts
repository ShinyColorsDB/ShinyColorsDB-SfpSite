import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { catchError, of } from 'rxjs';

import { ShinyColorsSfpUtilService } from '../../../service/shinycolors-sfp-util/shiny-colors-util.service';
import { ShinyColorsSfpAPIService } from '../../../service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';
import { ShinyColorsSfpMetaService } from '../../../service/shinycolors-sfp-meta/shiny-colors-meta.service';

import { SupportCharacter } from '../../interfaces/common';

@Component({
  selector: 'app-s-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './s-info.component.html',
  styleUrl: './s-info.component.css',
  host: {
    class: "col-xxl-10 col-lg-9 col-md-8 col-sm-12 overflow-auto vh-100 overflow-auto"
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
    private meta: Meta,
    private scSfpUtilService: ShinyColorsSfpUtilService,
    private scSfpMetaService: ShinyColorsSfpMetaService,
    private scSfpApiService: ShinyColorsSfpAPIService,
    private scSfpUrlService: ShinyColorsSfpUrlService,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (!params['cardId']) { return; }
      this.cardId = Number(params['cardId']);

      this.scSfpApiService.getSupportInfo(this.cardId)
        .pipe(catchError(err => {
          this.router.navigate(['/notfound'])
          return of(null);
        }))
        .subscribe((data) => {
          this.cardInfo = data!;

          this.title.setTitle(`${this.cardInfo.mlSupportCharaText_Name} ${this.cardInfo.mlCharacterText_Name}`);

          this.scSfpMetaService.getSupporteMeta(this.cardInfo).forEach(e => {
            if (this.meta.getTag(`name="${e.name}"`) == null) {
              this.meta.addTag(e);
            }
            else {
              this.meta.updateTag(e);
            }
          });

          this.scSfpUtilService.emitActiveIdolUnit(this.cardInfo.mstCharacterInfoId);
          this.scSfpUtilService.emitMobileTitle(this.cardInfo.mlSupportCharaText_Name);
        });
    });
  }

  ngOnInit(): void {

  }

  getPictureUrl(): string {
    return this.scSfpUrlService.getSupportPictureUrl(this.cardInfo.mstSupportCharacterId);
  }

  getEmptyArray(s: number): number[] {
    return new Array(s);
  }

  scheduleTranslate(): string {
    switch (this.cardInfo.goodScheduleDetailType) {
      case "vocal_training":
        return "自主練（Vo）";
      case "dance_training":
        return "自主練（Da）";
      case "visual_training":
        return "自主練（Vi）";

      case "vocal_lesson":
        return "レッスン（Vo）";
      case "dance_lesson":
        return "レッスン（Da）";
      case "visual_lesson":
        return "レッスン（Vi）";
      case "special_lesson":
        return "スペシャルレッスン";

      case "shopping_boutique":
        return "買い物（洋服）";
      case "shopping_cd":
        return "買い物（CD）";
      case "shopping_cosmetic":
        return "買い物（コスメ）";
      case "shopping_food":
        return "買い物（食べ物）";

      case "working_radio":
        return "お仕事（ラジオ出演）";
      case "working_tv":
        return "お仕事（テレビ出演）";
      case "working_model":
        return "お仕事（撮影モデル）";
      case "working_paper":
        return "お仕事（雑誌取材）";
      case "working_cm":
        return "お仕事（CM出演）";

      case "rest":
        return "オフ";

      default:
        return "";
    }
  }
}
