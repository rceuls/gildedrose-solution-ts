import { Item, GildedRose } from "../app/gilded-rose";
import { defaultConfig } from "../app/gilded-rose-config";
import { readFileSync } from "fs";
import { expect } from "chai";

// Before starting refactoring I created an inputfile containing 100 items using the
// golden-master-text-test.ts file (see my adjustments there). I dumped the generated output
// in a file (excluding the Conjured stuff) and use that to see that we do not have regression
// there. The requirements specified "add new item" => this implies according to me that
// the existing functionality is ok.
describe("Gilded Rose comparison Tests", () => {
  it("Should match the previous versions snapshot", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ];

    const gildedRose = new GildedRose(items, defaultConfig);
    const data: string[] = [];
    for (let i = 0; i < 100; i++) {
      data.push(`-------- day ${i} --------`);
      data.push("name, sellIn, quality");
      items.forEach((element) => {
        data.push(`${element.name};${element.sellIn};${element.quality}`);
      });
      gildedRose.updateQuality();
    }
    // could also use snapshots
    const snapshotContent = JSON.parse(
      readFileSync("./test/old-version-input.json").toString()
    ) as string[];

    // you could do expect(snapshotContent).to.eqls(data);
    // but good luck comparing that if you have an error somewhere :D
    expect(snapshotContent.length).to.equal(data.length);
    snapshotContent.forEach((_, ix) =>
      expect(snapshotContent[ix]).to.equal(data[ix])
    );
  });
});
