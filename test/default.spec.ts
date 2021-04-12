import { expect } from "chai";
import { Item } from "../app/gilded-rose";
import { defaultRule } from "../app/gilded-rose-rules";

// Added some basic unit tests for existing functionality.
// Normally these should exist => see also golden-master-integration.spec.ts.
describe("Gilded Rose - Regular Items tests", () => {
  it("Should update regular items - 1", () => {
    const ourItem = new Item("abc", 10, 12);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(11);
    expect(ourItem.sellIn).to.eq(9);
  });

  it("Should update regular items - 2", () => {
    const ourItem = new Item("abc", 10, -1);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(9);
  });

  it("Should update regular items - 3", () => {
    const ourItem = new Item("abc", 10, 1);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(9);
  });

  it("Should update regular items - 4", () => {
    const ourItem = new Item("abc", 0, 10);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(8);
    expect(ourItem.sellIn).to.eq(-1);
  });

  it("Should update regular items - 5", () => {
    const ourItem = new Item("abc", 1, 52);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(50);
    expect(ourItem.sellIn).to.eq(0);
  });

  it("Should update regular items - 6", () => {
    const ourItem = new Item("abc", 1, 100);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(50);
    expect(ourItem.sellIn).to.eq(0);
  });

  it("Should update regular items - 7", () => {
    const ourItem = new Item("abc", 1, -100);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(0);
  });
  it("Should update regular items - 8", () => {
    const ourItem = new Item("abc", 1, 0);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(0);
  });
  it("Should update regular items - 9", () => {
    const ourItem = new Item("abc", 1, 0);
    defaultRule(ourItem);
    expect(ourItem.quality).to.eq(0);
    expect(ourItem.sellIn).to.eq(0);
  });
});
