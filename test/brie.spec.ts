import { expect } from "chai";
import { Item } from "../app/gilded-rose";
import { ruleForBrie } from "../app/gilded-rose-rules";

// Added some basic unit tests for existing functionality.
// Normally these should exist => see also golden-master-integration.spec.ts.
describe("Gilded Rose - Brie tests", () => {
  it("Should update brie - name check", () => {
    expect(ruleForBrie.nameMatches("aged brie")).to.eq(true);
    expect(ruleForBrie.nameMatches("AGED Brie")).to.eq(true);
    expect(ruleForBrie.nameMatches("AGED BRIE")).to.eq(true); // for our aggressive goblin
    expect(ruleForBrie.nameMatches("AgEd BrIe")).to.eq(true);
    expect(ruleForBrie.nameMatches("AGED Brie with potatoes")).to.eq(false);
    expect(ruleForBrie.nameMatches("potato")).to.eq(false);
  });

  it("Should update brie - sellIn 10 -> 9, quality 12 -> 13 (1 iter)", () => {
    const ourItem = new Item("AGED Brie", 10, 12);
    ruleForBrie.update(ourItem);
    expect(ourItem.quality).to.eq(13);
    expect(ourItem.sellIn).to.eq(9);
  });

  it("Should update brie - sellIn 0 -> -1, quality 12 -> 14 (1 iter)", () => {
    const ourItem = new Item("AGED Brie", 0, 12);
    ruleForBrie.update(ourItem);
    expect(ourItem.quality).to.eq(14);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update brie - sellIn 0 -> -1, quality 49 -> 50 (1 iter)", () => {
    const ourItem = new Item("AGED Brie", 0, 49);
    ruleForBrie.update(ourItem);
    expect(ourItem.quality).to.eq(50);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update brie - sellIn 0 -> -1, quality -49 -> 0 (1 iter)", () => {
    const ourItem = new Item("AGED Brie", 0, -49);
    ruleForBrie.update(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(-1);
  });
});
