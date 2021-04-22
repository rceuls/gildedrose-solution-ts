import {
  IGildedRoseSpecialRule,
  ruleForBackstagePasses,
  ruleForBrie,
  ruleForSulfuras,
  ruleForConjurations,
} from "./gilded-rose-rules";

export interface IGildedRoseConfig {
  itemsThatHaveSpecialRules: IGildedRoseSpecialRule[];
}

export const defaultConfig: IGildedRoseConfig = {
  itemsThatHaveSpecialRules: [
    ruleForBrie,
    ruleForBackstagePasses,
    ruleForSulfuras,
    ruleForConjurations,
  ],
};
