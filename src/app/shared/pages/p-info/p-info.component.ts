import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbAccordionModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of } from 'rxjs';


import { ShinyColorsSfpAPIService } from '../../../service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';
import { UtilityService } from '../../../service/utility/utility.service';

import { IconComponent } from '../../components/icon/icon.component';
import { IdolSkillComponent } from '../../components/idol-skill/idol-skill.component';

import { IdolSkill, PotentialLiveSkill, PotentialLiveSkillLevel, ProduceIdol } from '../../interfaces/common';

@Component({
  selector: 'app-p-info',
  standalone: true,
  imports: [CommonModule, IconComponent, IdolSkillComponent, NgbCollapse, NgbAccordionModule],
  templateUrl: './p-info.component.html',
  styleUrl: './p-info.component.css',
  host: {
    class: "col-xxl-10 col-lg-9 col-md-8 col-sm-12 overflow-auto vh-100 overflow-auto",
    ngSkipHydration: 'true'
  }
})
export class PInfoComponent implements OnInit {

  cardId!: number;

  cardInfo!: ProduceIdol;

  current: number = 1;

  skillCollapseMap: Map<number, boolean> = new Map<number, boolean>();

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
      if (!params['cardId']) { return; }
      this.cardId = Number(params['cardId']);

      this.scSfpApiService.getProduceInfo(this.cardId)
        .pipe(catchError(err => {
          this.router.navigate(['/notfound'])
          return of(null);
        }))
        .subscribe((data) => {
          if (!data) { return; }

          this.cardInfo = data;

          this.title.setTitle(this.cardInfo.mlProduceIdolText_Name);
          //this.utilsService.generateIdolMeta(this.idolInfo).forEach(e => {
          //  this.meta.updateTag(e);
          //});

          this.utilService.emitActiveIds([this.cardInfo.mstIdolId, this.cardInfo.mstUnitId]);
          this.utilService.emitMobileTitle(this.cardInfo.mlProduceIdolText_Name);

          this.cardInfo.idolSkillList.forEach((e, index) => {
            this.skillCollapseMap.set(index, true);
          });
        });
    });
  }

  getPictureUrl(): string {
    return this.scSfpUrlService.getProducePictureUrl(this.cardId);
  }

  getMacroSkillIcon(thisSkill: IdolSkill): string {
    return this.scSfpUrlService.getMacroIdolSKillIconUrl(thisSkill.idolSkillActionEffectList[0].actionEffectList[0].iconId);
  }

  getSkillDescription(thisSkill: IdolSkill): string {
    return thisSkill.mlIdolSkillText_Name;
  }

  getPotentialSkillIcon(thisSkill: PotentialLiveSkill): string {
    return this.scSfpUrlService.getPotentiaoSkillIconUrl(thisSkill.mstPotentialLiveSkillId);
  }

  getTaglessDescription(desc: string | undefined): string {
    return desc!.replace(/<[^>]*>/g, '');
  }

  getIdolSkillCostIcon(): string {
    return this.scSfpUrlService.getIdolSkillCostIconUrl();
  }

  getCollapseStatus(skillIndex: number): boolean {
    return this.skillCollapseMap.get(skillIndex) || false;
  }

  getSortedIdolSkillList() {
    return this.cardInfo.idolSkillList.sort((a, b) => {
      return a.unlockPremiseEvolutionLevel - b.unlockPremiseEvolutionLevel;
    });
  }

  parsePotentialSkillEffect(n: PotentialLiveSkill) {
    let r = new Map<string, string[]>();
    n.levelList.forEach(e => {
      e.parameterList.forEach(p => {
        if (r.has(p.liveSkillType)) {
          if (p?.value) {
            r.get(p.liveSkillType)!.push(`${p.value!}`);
          }
          else {
            r.get(p.liveSkillType)!.push(`${p.millisecond / 1000}秒`);
          }
        }
        else {
          if (p?.value) {
            r.set(p.liveSkillType, [`${p.value!}`]);
          }
          else {
            r.set(p.liveSkillType, [`${p.millisecond / 1000}秒`]);
          }
        }
      });
    });
    return r;
  }
}
