import { CharacterInfo } from "./common";
import { Rarity } from "./enum";

export type CharacterAlbumMetadata = CharacterInfo & {
    mstUnitId?: number;
    mstIdolId?: number;
    mlUnitText_Name?: string;

    produceIdolBriefs: ProduceIdolBrief[];
    supportCharacterBriefs: SupportCharacterBrief[]
};

export type ProduceIdolBrief = {
    mstProduceIdolId: number;
    cost: number;
    // createDate: {
    //   seconds: string;
    //   nanos: number;
    // };
    initialStar: number;

    mlProduceIdolText_Name: string;
};

export type SupportCharacterBrief = {
    mstSupportCharacterId: number;
    rarity: Rarity;
    diamond: {
        limit: number;
    };
    // createDate: {
    //   seconds: string;
    //   nanos: number;
    // };

    mlSupportCharaText_Name: string;
};
