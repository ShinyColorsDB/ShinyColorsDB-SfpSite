import {
    GoodScheduleDetailType,
    LiveSkillType,
    NaviType,
    ProductType,
    Rarity,
} from "./enum";

export type StarIdolParameter = {
    star: number;
    idolParameter: {
        vocal: number;
        dance: number;
        visual: number;
        mental: number;
    };
};

export type LevelStatus = {
    current: number;
    limit: number;
};

export type AppealType =
    | "parameter_none"
    | "vocal"
    | "dance"
    | "visual"
    | "mental";

export type ActionEffect = {
    mstProduceActionEffectId: number;
    mstProduceActionEffectTypeId: number; // TODO: check the usage of this field
    valueList: number[];
    iconId: number;

    mlProduceCard_Description: string; // mstProduceActionEffectId as key
    mlProduceCard_CompareDescription: string; // mstProduceActionEffectId as key
};

export type ActionCondition = {
    mstProduceActionConditionTypeId: number;
    conditionValue: number;

    mlProduce_ActionConditionText: string;
};

export type ProductRecipe = {
    product: {
        productType: "skill_lv_up_ticket"; // ProductType
        productMstId: number;
        naviType: "skill_lv_up"; // NaviType
        sortId: number;

        mlItem_ItemName016: string;
    };
    amount: number;
};

export type IdolSkillActionEffect = {
    level: number;
    unlockPremiseStar: number;
    pp?: number;
    cost?: number;
    actionEffectList: ActionEffect[];
    actionCondition?: ActionCondition;
    productRecipeList?: ProductRecipe[]; // update requirements
    money?: number;
};

// there could be extra text in `mlTrainerSkill_Description` and `mlTrainerSkill_Name`, but not for every IdolSkill
export type IdolSkill = {
    mstIdolSkillId: number;
    level: LevelStatus;
    unlockPremiseEvolutionLevel: number;
    appealTypeList: string[]; // "parameter_none" | "vocal" | "dance" | "visual" | "mental"
    idolSkillActionEffectList: IdolSkillActionEffect[];

    mlIdolSkillText_Name: string;
    mlIdolSkillText_Description: string;
};

export type ADVInfo = {
    mlADVInfo_Summary: string; // get via `mlADVInfo_Summary_${mstAdvInfoId}`[index]
    mlADVInfo_Title: string; // get via `mlADVInfo_Title_${mstAdvInfoId}`[index]
};

export type ProduceIdolEvent = {
    mstProduceIdolEventId: number;
    mstAdvInfoId: string;
} & ADVInfo;

export type PotentialLiveSkillLevel = {
    level: number;
    mstPotentialLiveSkillLevelId: number;
    parameterList: {
        liveSkillType: LiveSkillType;
        value?: number;
        millisecond: number;
    }[];

    mlPotentialLiveSkillText_Description: string;
};

export type PotentialLiveSkill = {
    mstPotentialLiveSkillId: number;
    levelList: PotentialLiveSkillLevel[];
    level: LevelStatus;
    unlockPremiseStar: number;

    mlPotentialLiveSkillText_Title: string;
};

export type DressSet = {
    unlockPremiseStar: number;
    mstCostumeSetId: number;

    mlCostume_Description: string;
    mlCostumeSet_Description: string;
    mlCostumeSet_UnlockPremise: string;
    mlHairstyle_Description: string;
    mlHairstyle_Name: string;
    mlHairstyle_UnlockPremise: string;
    mlItem_ItemName024: string; // costume?
    mlItem_ItemDesc024: string; //
    mlItem_ItemName025: string; // hairstyle name
    mlItem_ItemDesc025: string; // empty
};

export type LimitBreakRecipeProduct = {
    productType: ProductType;
    productMstId: number;
    naviType: NaviType;
    sortId: number;

    mlItem_ItemDesc010?: string; // produce card
    mlItem_ItemDesc011?: string; // support card
};

export type CharacterInfo = {
    mstCharacterInfoId: number;
    mlCharacterText_CV: string;
    mlCharacterText_FirstName: string;
    mlCharacterText_LastName: string;
    mlCharacterText_Name: string;
};

export type ProduceIdol = CharacterInfo & {
    mstProduceIdolId: number;
    cost: number;
    star: LevelStatus;
    evolutionLevel: LevelStatus;
    starIdolParameterList?: StarIdolParameter[];
    idolParameter?: {
        vocal: number;
        dance: number;
        visual: number;
        mental: number;
    };
    selectedMstIdolSkillId: number;
    idolSkillList: IdolSkill[];
    produceIdolEventList: ProduceIdolEvent[];
    potentialLiveSkillList: PotentialLiveSkill[];
    dressSetList: DressSet[];
    createDate?: {
        seconds: string;
        nanos: number;
    };
    limitBreakRecipeProduct?: LimitBreakRecipeProduct;
    evolutionRecipeGroupId: number;
    mstUnitId: number;
    mstIdolId: number;
    initialStar: number;
    cardId: number;

    mlProduceIdolText_Name: string;
    mlUnitText_Name: string;
};

export type ProduceEntrust = {
    appealType?: AppealType;
    score: number;
};

export type SupportEffect = {
    mstSupportEffectId: number;
    unlockPremiseLevel: number;
    produceEntrust: ProduceEntrust;

    mlSupportEffectText_Description: string;
    mlSupportEffectText_Name: string;
};

export type PotentialSupportSkill = {
    mstPotentialSupportSkillId: number;
    produceEntrust: ProduceEntrust;

    mlPotentialSupportSkillText_Description: string;
    mlPotentialSupportSkillText_Name: string;
};

export type SupportCharacterEvent = {
    mstSupportCharacterEventId: number;
    mstAdvInfoId: string;
} & ADVInfo;

export type SupportCharacter = {
    mstSupportCharacterId: number;
    rarity: Rarity; // or enum if you have predefined values
    level: LevelStatus;
    diamond: {
        limit: number;
    };
    supportSkillSlotAmount: LevelStatus;
    supportEffectList: SupportEffect[];
    potentialSupportSkillList: PotentialSupportSkill[];
    supportCharacterEventList: SupportCharacterEvent[];
    createDate: {
        seconds: string;
        nanos: number;
    };
    limitBreakRecipeProduct: LimitBreakRecipeProduct;
    cardId: number;
    goodScheduleDetailType: GoodScheduleDetailType;
    produceEntrust: ProduceEntrust;

    mlSupportCharaText_Name: string;
} & CharacterInfo;

export type SfpCharacterBasicInfo = {
    char_hiragana: string,
    char_nickName: string,
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
}
