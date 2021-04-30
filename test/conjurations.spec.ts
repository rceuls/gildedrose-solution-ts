import { expect } from "chai";
import { Item } from "../app/gilded-rose";
import { ruleForConjurations } from "../app/gilded-rose-rules";

// Added some basic unit tests for existing functionality.
// Normally these should exist => see also golden-master-integration.spec.ts.
describe("Gilded Rose - conjuration tests", () => {
  it("Should conjuration - name check", () => {
    expect(ruleForConjurations.nameMatches("CONJURED stuff")).to.eq(true);
    expect(ruleForConjurations.nameMatches("blabla conjured blabla")).to.eq(
      true
    );
    expect(ruleForConjurations.nameMatches("CoNjUrEd")).to.eq(true);
    expect(
      ruleForConjurations.nameMatches("summoned ruleForConjurations CONJURED")
    ).to.eq(true);
    expect(
      ruleForConjurations.nameMatches("AGED BACKSTOG POSSES with potatoes")
    ).to.eq(false);
    expect(ruleForConjurations.nameMatches("potato")).to.eq(false);
  });

  it("Should update conjurations - sellIn 10 -> 9, quality 12 -> 10 (1 iter)", () => {
    const ourItem = new Item("summoned", 10, 12);
    ruleForConjurations.update(ourItem);
    expect(ourItem.quality).to.eq(10);
    expect(ourItem.sellIn).to.eq(9);
  });

  it("Should update conjurations - sellIn 0 -> -1, quality 12 -> 8 (1 iter)", () => {
    const ourItem = new Item("summoned", 0, 12);
    ruleForConjurations.update(ourItem);
    expect(ourItem.quality).to.eq(8);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update conjurations - sellIn 0 -> 01, quality -12 -> 0 (1 iter)", () => {
    const ourItem = new Item("summoned", 0, -12);
    ruleForConjurations.update(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update conjurations - sellIn 0 -> -1, quality 55 -> 50 (1 iter)", () => {
    const ourItem = new Item("summoned", 0, 55);
    ruleForConjurations.update(ourItem);
    expect(ourItem.quality).to.eq(50);
    expect(ourItem.sellIn).to.eq(-1);
  });
});
