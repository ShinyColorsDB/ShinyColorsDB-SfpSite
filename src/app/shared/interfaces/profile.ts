import { CharacterAlbumMetadata } from "./album"

export type SfpCharacterBasicInfo = CharacterAlbumMetadata & {
  char_hiragana: string,
  char_name: string,
  char_nickName: string,
  char_idolId: number,
  char_unitId: number,
  char_age: number,
  char_bloodType: string,
  char_birthday: string,
  char_starSign: string,
  char_height: number,
  char_weight: number,
  char_bust: number,
  char_waist: number,
  char_hip: number,
  char_hand: string,
  char_birthPlace: string,
  char_hobby: string,
  char_specialSkill: string,
  char_color1: string,
  char_color2: string
  char_desc: string,
  char_cv: string,
}
