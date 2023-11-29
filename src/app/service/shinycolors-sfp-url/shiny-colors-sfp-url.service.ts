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
}
