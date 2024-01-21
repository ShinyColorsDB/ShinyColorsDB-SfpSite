import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NgbAccordionModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of } from 'rxjs';

import { ShinyColorsSfpAPIService } from '../../../service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';
import { ShinyColorsSfpUtilService } from '../../../service/shinycolors-sfp-util/shiny-colors-util.service';
import { ShinyColorsSfpMetaService } from '../../../service/shinycolors-sfp-meta/shiny-colors-meta.service';

import { IdolSkillComponent } from '../../components/idol-skill/idol-skill.component';

import { IdolSkill, PotentialLiveSkill, ProduceIdol } from '../../interfaces/common';
import { LiveSkillType } from '../../interfaces/enum';

@Component({
  selector: 'app-p-info',
  standalone: true,
  imports: [CommonModule, IdolSkillComponent, NgbCollapse, NgbAccordionModule],
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
    private meta: Meta,
    private scSfpUtilService: ShinyColorsSfpUtilService,
    private scSfpMetaService: ShinyColorsSfpMetaService,
    private scSfpApiService: ShinyColorsSfpAPIService,
    private scSfpUrlService: ShinyColorsSfpUrlService,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (!params['cardId']) { return; }
      this.cardId = Number(params['cardId']);

      this.scSfpApiService.getProduceInfo(this.cardId)
        .pipe(catchError(err => {
          this.router.navigate(['/notfound'])
          return of(null);
        }))
        .subscribe((data) => {
          this.cardInfo = data!;

          this.title.setTitle(this.cardInfo.mlProduceIdolText_Name);
          this.scSfpMetaService.getProduceMeta(this.cardInfo).forEach(e => {
            if (!this.meta.getTag(`name="${e.name}"`)) {
              this.meta.addTag(e);
            }
            else {
              this.meta.updateTag(e);
            }
          });

          this.scSfpUtilService.emitActiveIdolUnit(this.cardInfo.mstIdolId);
          this.scSfpUtilService.emitMobileTitle(this.cardInfo.mlProduceIdolText_Name);

          this.cardInfo.idolSkillList.forEach((e, index) => {
            this.skillCollapseMap.set(index, true);
          });
        });
    });
  }

  ngOnInit(): void {

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
        const [name, value] = this.potentialTranslate(p.liveSkillType, p.value, p.millisecond);
        if (r.has(name)) {
          r.get(name)?.push(value);
        }
        else {
          r.set(name, [value]);
        }
      });
    });
    return r;
  }

  potentialTranslate(l: LiveSkillType, value: number | undefined, ms: number) {
    switch (l) {
      // second
      case 'judgment_enhancement': // 判定強化
        return ['判定強化', `${ms / 1000}秒`];
      case 'perfect_judgment_enhancement': // パーフェクト判定強化
        return ['パーフェクト判定強化', `${ms / 1000}秒`];
      case 'invincible': // 無敵化
        return ['無敵化', `${ms / 1000}秒`];

      // percent
      case 'combo_bonus': // コンボボーナス
        return ['コンボボーナス', `${value}%`];
      case 'idol_base_exp_up': // アイドルLv経験値UP
        return ['アイドルLv経験値UP', `${value}%`];
      case 'fan_up': // ファン数UP
        return ['ファン数UP', `${value}%`];
      case 'score_up': // スコアUP
        return ['スコアUP', `${value}%`];
      case 'perfect_score_up': // パーフェクトスコアUP
        return ['パーフェクトスコアUP', `${value}%`];
      case 'long_score_up': // ロングスコアUP
        return ['ロングスコアUP', `${value}%`];
      case 'flick_score_up': // フリックスコアUP
        return ['フリックスコアUP', `${value}%`];
      case 'money_drop_up': // マニードロップ量UP
        return ['マニードロップ量UP', `${value}%`];
      case 'bonus_reward': // おまけ報酬ドロップ
        return ['おまけ報酬ドロップ', `${value}%`];
      case 'dearness_up': // 信頼度UP
        return ['信頼度UP', `${value}%`];

      // raw
      case 'recovery': // 回復
        return ['回復', `${value}`];
    }
  }
}
