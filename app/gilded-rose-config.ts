import {
  IGildedRoseSpecialRule,
  ruleForBackstagePasses,
  ruleForBrie,
  ruleForSulfuras,
  ruleForSummons,
} from "./gilded-rose-rules";

export interface IGildedRoseConfig {
  itemsThatHaveSpecialRules: IGildedRoseSpecialRule[];
}

export const defaultConfig: IGildedRoseConfig = {
  itemsThatHaveSpecialRules: [
    ruleForBrie,
    ruleForBackstagePasses,
    ruleForSulfuras,
    ruleForSummons,
  ],
};
