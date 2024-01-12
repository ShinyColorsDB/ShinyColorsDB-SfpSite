import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShinyColorsSfpUrlService {

  readonly BASE_URL = "https://sfp-static.shinycolors.moe";

  constructor() { }

  getUnitIconUrl(unitId: number): string {
    return `${this.BASE_URL}/images/units/icon/Ico_Unit_${unitId.toString() }.png`;
  }

  getBigIdolIconUrl(idolId: number): string {
    return `${this.BASE_URL}/images/characters/bigIcon/cb_icon_rect_7${idolId.toString().padStart(2, "0")}001.png`;
  }

  getSmallIdolIconUrl(idolId: number): string {
    return `${this.BASE_URL}/images/characters/smlIcon/TwestaChrIcon_${idolId.toString().padStart(2, "0")}.png`;
  }

  getProduceIconUrl(cardId: number): string {
    return `${this.BASE_URL}/images/content/idols/icon/pi_icon_sq_${cardId}.png`;
  }

  getProducePictureUrl(cardId: number): string {
    return `${this.BASE_URL}/images/content/idols/card/pi_icon_rect_${cardId}.png`;
  }

  getSupportPictureUrl(cardId: number): string {
    return `${this.BASE_URL}/images/content/support_idols/card/sc_icon_rect_${cardId}.png`;
  }

  getIdolSkillCostIconUrl(): string {
    return `${this.BASE_URL}/images/ui/Skill_Cost_BaseNoamal.png`;
  }

  getMacroIdolSKillIconUrl(skillId: number): string {
    return `${this.BASE_URL}/images/skills/idol/IdolSkillType_Icon_${skillId.toString().padStart(2, "0")}.png`;
  }

  getPotentiaoSkillIconUrl(skillId: number): string {
    return `${this.BASE_URL}/images/skills/potential/Ico_PotentialLiveSkill_${skillId}_l.png`;
  }
}
