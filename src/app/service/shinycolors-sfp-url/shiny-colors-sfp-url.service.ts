import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShinyColorsSfpUrlService {

  constructor() { }

  getUnitIconUrl(unitId: number): string {
    return `https://sfp-static.shinycolors.moe/images/units/icon/Ico_Unit_${unitId.toString() }.png`;
  }

  getBigIdolIconUrl(idolId: number): string {
    return `https://sfp-static.shinycolors.moe/images/characters/bigIcon/cb_icon_rect_7${idolId.toString().padStart(2, "0")}001.png`;
  }

  getSmallIdolIconUrl(idolId: number): string {
    return `https://sfp-static.shinycolors.moe/images/characters/smlIcon/TwestaChrIcon_${idolId.toString().padStart(2, "0")}.png`;
  }

  getProducePictureUrl(cardId: number): string {
    return `https://sfp-static.shinycolors.moe/images/content/idols/card/pi_icon_rect_${cardId}.png`
  }

  getSupportPictureUrl(cardId: number): string {
    return `https://sfp-static.shinycolors.moe/images/content/support_idols/card/sc_icon_rect_${cardId}.png`
  }

  getMacroIdolSKillIconUrl(skillId: number): string {
    return `https://sfp-static.shinycolors.moe/images/skills/idol/IdolSkillType_Icon_${skillId.toString().padStart(2, "0")}.png`
  }

  getPotentiaoSkillIconUrl(skillId: number): string {
    return `https://sfp-static.shinycolors.moe/images/skills/potential/Ico_PotentialLiveSkill_${skillId}_l.png`
  }
}
