import { expect } from "chai";
import { Item } from "../app/gilded-rose";
import { ruleForSummons } from "../app/gilded-rose-rules";

// Added some basic unit tests for existing functionality.
// Normally these should exist => see also golden-master-integration.spec.ts.
describe("Gilded Rose - summons tests", () => {
  it("Should summons summons - name check", () => {
    expect(ruleForSummons.nameMatches("CONJURED stuff")).to.eq(true);
    expect(ruleForSummons.nameMatches("blabla conjured blabla")).to.eq(true);
    expect(ruleForSummons.nameMatches("CoNjUrEd")).to.eq(true);
    expect(
      ruleForSummons.nameMatches("summoned ruleForSummons CONJURED")
    ).to.eq(true);
    expect(
      ruleForSummons.nameMatches("AGED BACKSTOG POSSES with potatoes")
    ).to.eq(false);
    expect(ruleForSummons.nameMatches("potato")).to.eq(false);
  });

  it("Should update summons - 1", () => {
    const ourItem = new Item("summoned", 10, 12);
    ruleForSummons.update(ourItem);
    expect(ourItem.quality).to.eq(10);
    expect(ourItem.sellIn).to.eq(9);
  });

  it("Should update summons - 2", () => {
    const ourItem = new Item("summoned", 0, 12);
    ruleForSummons.update(ourItem);
    expect(ourItem.quality).to.eq(8);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update summons - 3", () => {
    const ourItem = new Item("summoned", 0, -12);
    ruleForSummons.update(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update summons - 4", () => {
    const ourItem = new Item("summoned", 0, 55);
    ruleForSummons.update(ourItem);
    expect(ourItem.quality).to.eq(50);
    expect(ourItem.sellIn).to.eq(-1);
  });
});
