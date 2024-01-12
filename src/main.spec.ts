import fc from "fast-check";
import { describe, expect, it } from "vitest";

enum Coin{
  FIVE = 5
}
class VendingMachine {
  amount: number= 0;

  insert(coin: Coin) {

  }
}

describe("Vending machine kata should", () => {
  /*Todo:
    - Feature
         Accept coins
         - Insert permitted coins
         - Insert non-permitted coins

  */
  it("Sum inserted amount", () => {
    const machine = new VendingMachine()
    machine.insert(Coin.FIVE)
    expect(machine.amount).toBe(5)
  });


});
