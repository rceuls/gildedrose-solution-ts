import { expect } from "chai";
import { Item } from "../app/gilded-rose";
import { defaultRule, ruleForBrie } from "../app/gilded-rose-rules";

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

  it("Should update brie - 1", () => {
    const ourItem = new Item("AGED Brie", 10, 12);
    ruleForBrie.update(ourItem);
    expect(ourItem.quality).to.eq(13);
    expect(ourItem.sellIn).to.eq(9);
  });

  it("Should update brie - 2", () => {
    const ourItem = new Item("AGED Brie", 0, 12);
    ruleForBrie.update(ourItem);
    expect(ourItem.quality).to.eq(14);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update brie - 3", () => {
    const ourItem = new Item("AGED Brie", 0, 49);
    ruleForBrie.update(ourItem);
    expect(ourItem.quality).to.eq(50);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update brie - 3", () => {
    const ourItem = new Item("AGED Brie", 0, -49);
    ruleForBrie.update(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(-1);
  });
});
