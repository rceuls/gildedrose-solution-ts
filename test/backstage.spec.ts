import { expect } from "chai";
import { Item } from "../app/gilded-rose";
import { ruleForBackstagePasses } from "../app/gilded-rose-rules";

// Added some basic unit tests for existing functionality.
// Normally these should exist => see also golden-master-integration.spec.ts.
describe("Gilded Rose - backstage tests", () => {
  it("Should backstage backstage - name check", () => {
    expect(ruleForBackstagePasses.nameMatches("BACKSTAGE PASSES")).to.eq(true);
    expect(
      ruleForBackstagePasses.nameMatches("Backstage Passes for random stuff")
    ).to.eq(true);
    expect(
      ruleForBackstagePasses.nameMatches("Our backstage passes for")
    ).to.eq(true);
    expect(ruleForBackstagePasses.nameMatches("BaCkStAge PASSES")).to.eq(true);
    expect(
      ruleForBackstagePasses.nameMatches("AGED BACKSTOG POSSES with potatoes")
    ).to.eq(false);
    expect(ruleForBackstagePasses.nameMatches("potato")).to.eq(false);
  });

  it("Should update backstage - sellIn 10 -> 9, quality 14 -> 12 (1 iter)", () => {
    const ourItem = new Item("BSP", 10, 12);
    ruleForBackstagePasses.update(ourItem);
    expect(ourItem.quality).to.eq(14);
    expect(ourItem.sellIn).to.eq(9);
  });

  it("Should update backstage - sellIn 0 -> -1, quality 12 -> 0 (1 iter)", () => {
    const ourItem = new Item("BSP", 0, 12);
    ruleForBackstagePasses.update(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update backstage - sellIn 0 -> -1, quality 49 -> 0 (1 iter)", () => {
    const ourItem = new Item("BSP", 0, 49);
    ruleForBackstagePasses.update(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update backstage - sellIn 5 -> 4, quality 12 -> 15 (1 iter)", () => {
    const ourItem = new Item("BSP", 5, 12);
    ruleForBackstagePasses.update(ourItem);
    expect(ourItem.quality).to.eq(15);
    expect(ourItem.sellIn).to.eq(4);
  });

  it("Should update backstage - sellIn 1 -> 0, quality 12 -> 15 (1 iter)", () => {
    const ourItem = new Item("BSP", 1, 12);
    ruleForBackstagePasses.update(ourItem);
    expect(ourItem.quality).to.eq(15);
    expect(ourItem.sellIn).to.eq(0);
  });

  it("Should update backstage - sellIn 15 -> 14, quality 12 -> 13 (1 iter)", () => {
    const ourItem = new Item("BSP", 15, 12);
    ruleForBackstagePasses.update(ourItem);
    expect(ourItem.quality).to.eq(13);
    expect(ourItem.sellIn).to.eq(14);
  });

  it("Should update backstage - sellIn 15 -> 14, quality 500 -> 50 (1 iter)", () => {
    const ourItem = new Item("BSP", 15, 500);
    ruleForBackstagePasses.update(ourItem);
    expect(ourItem.quality).to.eq(50);
    expect(ourItem.sellIn).to.eq(14);
  });
});
