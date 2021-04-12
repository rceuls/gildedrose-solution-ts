import { writeFileSync } from "fs";
import { Item, GildedRose } from "../app/gilded-rose";
import { defaultConfig } from "../app/gilded-rose-config";

const items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  // this conjured item does not work properly yet
  // new Item("Conjured Mana Cake", 3, 6),
];

const gildedRose = new GildedRose(items, defaultConfig);
const days = 100;
const data: string[] = [];
for (let i = 0; i < days; i++) {
  data.push(`-------- day ${i} --------`);
  data.push("name, sellIn, quality");
  items.forEach((element) => {
    data.push(`${element.name};${element.sellIn};${element.quality}`);
  });
  gildedRose.updateQuality();
}

writeFileSync("./test/old-version-input.json", JSON.stringify(data));
