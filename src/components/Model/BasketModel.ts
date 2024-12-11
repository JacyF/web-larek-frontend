// // Importing
import { IProductItem } from "../../types";
import { IBasketModel } from "../../types/Components/Model/BasketModel";

// Basket class
export class BasketModel implements IBasketModel {

  // Products list
  private _basketProducts: Map<string, { item: IProductItem; count: number }> = new Map();

  get basketProducts():IProductItem[] {
    return Array.from(this._basketProducts.values()).flatMap(({item, count}) => 
      Array(count).fill(item));
  }

  // Total number of items in the basket
  getBasketCount(): number {
    return Array.from(this._basketProducts.values()).reduce((total, {count}) => 
      total + count, 0);
  }

  // Total sum of items in the basket
  sumAllBasketItems(): number {
    return Array.from(this._basketProducts.values()).reduce((sum, {item, count}) => 
      sum + item.price * count, 0);
  }

  // Add item to the basket
  setSelectedCard(data: IProductItem): void {
    const existing = this._basketProducts.get(data.id);
    if (existing) {
      existing.count += 1;
    } else {
      this._basketProducts.set(data.id, { item: data, count: 1 });
    } 
  }

  // Delete item in the basket
  deleteCardFromBasket(item: IProductItem): void {
    const existing = this._basketProducts.get(item.id);
    if (existing) {
      if (existing.count > 1) {
        existing.count -= 1;
      } else {
        this._basketProducts.delete(item.id);
      }
    }
  }

  // Clean the basket
  clearBasketItems(): void {
    this._basketProducts.clear();
  }
}