import { Injectable } from '@angular/core';
import { ProduceIdol, SupportCharacter } from '../../shared/interfaces/common';
import { SfpCharacterBasicInfo } from '../../shared/interfaces/profile';

import { ShinyColorsSfpUrlService } from '../shinycolors-sfp-url/shiny-colors-sfp-url.service';

@Injectable({
  providedIn: 'root'
})
export class ShinyColorsSfpMetaService {

  constructor(
    private scSfpUrlService: ShinyColorsSfpUrlService,
  ) { }

  getDefaultMeta(): { name: string; content: string }[] {
    return [
      {
        name: 'og:type',
        content: 'website'
      },
      {
        name: 'og:url',
        content: 'https://sfp.shinycolors.moe/'
      },
      {
        name: 'og:title',
        content: ' ~ 蝦泥松資料庫 ~ '
      },
      {
        name: 'og:description',
        content: '歡迎來到蝦泥松資料庫! 本網頁蒐集了遊戲 The Idolm@ster Shiny Colors Song for Prism中的遊戲資料，希望對各位有所幫助\nThe IDOLM@STER Shiny Colors, アイドルマスター シャイニーカラーズ, ShinyColorsDB, Shiny Colors, ShinyColors, シャニソン, 偶像大師閃耀色彩'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:url',
        content: 'https://sfp.shinycolors.moe/'
      },
      {
        name: 'twitter:title',
        content: ' ~ 蝦泥松資料庫 ~ '
      },
      {
        name: 'twitter:description',
        content: '歡迎來到蝦泥松資料庫! 本網頁蒐集了遊戲 The Idolm@ster Shiny Colors Song for Prism中的遊戲資料，希望對各位有所幫助\nThe IDOLM@STER Shiny Colors, アイドルマスター シャイニーカラーズ, ShinyColorsDB, Shiny Colors, ShinyColors, シャニソン, 偶像大師閃耀色彩'
      },
      {
        name: 'description',
        content: '歡迎來到蝦泥松資料庫! 本網頁蒐集了遊戲 The Idolm@ster Shiny Colors Song for Prism中的遊戲資料，希望對各位有所幫助\nThe IDOLM@STER Shiny Colors, アイドルマスター シャイニーカラーズ, ShinyColorsDB, Shiny Colors, ShinyColors, シャニソン, 偶像大師閃耀色彩'
      }
    ];
  }

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

  getIdolMeta(idolInfo: SfpCharacterBasicInfo): { name: string; content: string }[] {
    return [
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: idolInfo.char_name},
      {
        name: 'og:description',
        content: `${idolInfo.char_name}\n${idolInfo.char_desc}`,
      },
      {
        name: 'og:image',
        content: this.scSfpUrlService.getBigIdolIconUrl(idolInfo.char_idolId),
      },
      { name: 'theme-color', content: idolInfo.char_color1 },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: idolInfo.char_name },
      {
        name: 'twitter:description',
        content: `${idolInfo.char_name}\n${idolInfo.char_desc}`,
      },
      {
        name: 'twitter:url',
        content: `https://shinycolors.moe/idolinfo?idolid=${idolInfo.char_idolId}`,
      },
      {
        name: 'twitter:image',
        content: this.scSfpUrlService.getBigIdolIconUrl(idolInfo.char_idolId),
      },
      {
        name: 'description',
        content: `${idolInfo.char_name}\n${idolInfo.char_desc}`,
      }
    ]
  }
}
