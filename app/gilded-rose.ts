import { defaultConfig, IGildedRoseConfig } from "./gilded-rose-config";
import { defaultRule } from "./gilded-rose-rules";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  config: IGildedRoseConfig;

  constructor(
    items = [] as Array<Item>,
    config: IGildedRoseConfig = defaultConfig
  ) {
    this.items = items ?? [];
    this.config = config;
  }

  private prevalidate() {
    this.items.forEach((x) => {
      x.quality = x.quality > 50 ? 50 : x.quality;
      x.quality = x.quality < 0 ? 0 : x.quality;
    });
  }

  public updateQuality(): void {
    this.prevalidate();
    this.items.forEach((item) => {
      const rules = this.config.itemsThatHaveSpecialRules.filter((x) =>
        x.nameMatches(item.name)
      );
      if (rules.length === 1) {
        rules[0].update(item);
      } else {
        defaultRule(item);
      }
    });
  }
}
