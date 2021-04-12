import { expect } from "chai";
import { Item } from "../app/gilded-rose";
import { ruleForSulfuras } from "../app/gilded-rose-rules";

// Added some basic unit tests for existing functionality.
// Normally these should exist => see also golden-master-integration.spec.ts.
describe("Gilded Rose - sulfuras tests", () => {
  it("Should sulfuras sulfuras - name check", () => {
    expect(ruleForSulfuras.nameMatches("sulfuras")).to.eq(true);
    expect(ruleForSulfuras.nameMatches("sulfuras for random stuff")).to.eq(
      true
    );
    expect(ruleForSulfuras.nameMatches("Our sulfuras passes for")).to.eq(true);
    expect(ruleForSulfuras.nameMatches("SOLFOROS")).to.eq(false);
    expect(ruleForSulfuras.nameMatches("dfd")).to.eq(false);
  });

  it("Should update sulfuras - 1", () => {
    const ourItem = new Item("sulfuras", 10, 12);
    ruleForSulfuras.update(ourItem);
    expect(ourItem.quality).to.eq(80);
    expect(ourItem.sellIn).to.eq(10);
  });

  it("Should update sulfuras - 2", () => {
    const ourItem = new Item("sulfuras", 0, 12);
    ruleForSulfuras.update(ourItem);
    expect(ourItem.quality).to.eq(80);
    expect(ourItem.sellIn).to.eq(0);
  });

  it("Should update sulfuras - 3", () => {
    const ourItem = new Item("sulfuras", 0, 49);
    ruleForSulfuras.update(ourItem);
    expect(ourItem.quality).to.eq(80);
    expect(ourItem.sellIn).to.eq(0);
  });

  it("Should update sulfuras - 4", () => {
    const ourItem = new Item("sulfuras", 5, 12);
    ruleForSulfuras.update(ourItem);
    expect(ourItem.quality).to.eq(80);
    expect(ourItem.sellIn).to.eq(5);
  });

  it("Should update sulfuras - 5", () => {
    const ourItem = new Item("sulfuras", 1, 12);
    ruleForSulfuras.update(ourItem);
    expect(ourItem.quality).to.eq(80);
    expect(ourItem.sellIn).to.eq(1);
  });

  it("Should update sulfuras - 6", () => {
    const ourItem = new Item("sulfuras", 15, 12);
    ruleForSulfuras.update(ourItem);
    expect(ourItem.quality).to.eq(80);
    expect(ourItem.sellIn).to.eq(15);
  });
});
