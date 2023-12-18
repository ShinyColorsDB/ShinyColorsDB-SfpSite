import { Injectable } from '@angular/core';
import { ProduceIdol, SupportCharacter } from '../../shared/interfaces/common';

import { ShinyColorsSfpUrlService } from '../shinycolors-sfp-url/shiny-colors-sfp-url.service';

@Injectable({
  providedIn: 'root'
})
export class ShinyColorsSfpMetaService {

  constructor(
    private scSfpUrlService: ShinyColorsSfpUrlService,
  ) { }

  getProduceMeta(card: ProduceIdol): { name: string; content: string }[] {
    return [
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: `${card.mlProduceIdolText_Name} ${card.mlCharacterText_Name}` },
      {
        name: 'og:image',
        content: this.scSfpUrlService.getProduceIconUrl(card.mstProduceIdolId),
      },
      //{ name: 'theme-color', content: card.idol.color1 },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${card.mlProduceIdolText_Name} ${card.mlCharacterText_Name}` },
      {
        name: 'twitter:url',
        content: `https://sfp.shinycolors.moe/pinfo?cardId=${card.mstProduceIdolId}`,
      },
      {
        name: 'twitter:image',
        content: this.scSfpUrlService.getProduceIconUrl(card.mstProduceIdolId),
      }
      /*{
        name: 'description',
        content: `卡名: ${card.cardName}\n 稀有度: ${card.cardType}\n 實裝: ${card.releaseDate}`
      }*/
    ];
  }

  getSupporteMeta(card: SupportCharacter): { name: string; content: string }[] {
    return [
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: `${card.mlSupportCharaText_Name} ${card.mlCharacterText_Name}` },
      {
        name: 'og:image',
        content: this.scSfpUrlService.getSupportPictureUrl(card.mstSupportCharacterId),
      },
      //{ name: 'theme-color', content: card.idol.color1 },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${card.mlSupportCharaText_Name} ${card.mlCharacterText_Name}` },
      {
        name: 'twitter:url',
        content: `https://sfp.shinycolors.moe/sinfo?cardId=${card.mstSupportCharacterId}`,
      },
      {
        name: 'twitter:image',
        content: this.scSfpUrlService.getSupportPictureUrl(card.mstSupportCharacterId),
      }
      /*{
        name: 'description',
        content: `卡名: ${card.cardName}\n 稀有度: ${card.cardType}\n 實裝: ${card.releaseDate}`
      }*/
    ];
  }

  getIdolMeta(idol: any) {

  }
}
