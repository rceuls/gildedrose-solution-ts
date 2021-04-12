import { Item } from "./gilded-rose";

export interface IGildedRoseSpecialRule {
  // Validates that the item should be managed by this rule
  nameMatches: (itemName: string) => boolean;
  // Update both quality and sellIn fields.
  update: (item: Item) => void;
}

const checkBoundsForItemQuality = (item: Item) => {
  item.quality = item.quality >= 50 ? 50 : item.quality;
  item.quality = item.quality <= 0 ? 0 : item.quality;
};

export const ruleForBrie: IGildedRoseSpecialRule = {
  nameMatches: (itemName: string) =>
    itemName.toLocaleLowerCase() === "aged brie",
  update: (item: Item) => {
    item.quality = item.quality += item.sellIn <= 0 ? 2 : 1;
    checkBoundsForItemQuality(item);
    item.sellIn -= 1;
  },
};

export const ruleForBackstagePasses: IGildedRoseSpecialRule = {
  nameMatches: (itemName: string) =>
    itemName.toLocaleLowerCase().indexOf("backstage passes") !== -1,
  update: (item: Item) => {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality = item.quality += 3;
    } else if (item.sellIn <= 10) {
      item.quality = item.quality += 2;
    } else {
      item.quality += 1;
    }
    item.sellIn -= 1;
    checkBoundsForItemQuality(item);
  },
};

export const ruleForSulfuras: IGildedRoseSpecialRule = {
  nameMatches: (itemName: string) =>
    itemName.toLocaleLowerCase().indexOf("sulfuras") !== -1,
  update: (item: Item) => {
    item.quality = 80;
  },
};

export const ruleForSummons: IGildedRoseSpecialRule = {
  nameMatches: (itemName: string) =>
    itemName.toLocaleLowerCase().indexOf("conjured") !== -1,
  update: (item: Item) => {
    // normally one should also consider "brie", "sulfuras" etc but the only special rules
    // that were giving in the requirements were rules regarding "increase" of quality.
    // One could bypass that by adding an extra parameter here saying "other rules affecting this rule"
    const degradeSpeed = item.sellIn <= 0 ? 4 : 2;
    item.quality -= degradeSpeed;
    item.sellIn -= 1;
    checkBoundsForItemQuality(item);
  },
};

export const defaultRule: (item: Item) => void = (item: Item) => {
  const degradeSpeed = item.sellIn <= 0 ? 2 : 1;
  item.quality -= degradeSpeed;
  item.sellIn -= 1;
  checkBoundsForItemQuality(item);
};
