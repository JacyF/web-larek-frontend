// Importing
import { IProductItem } from "../../types";
import { IBasketModel } from "../../types/Components/Model/BasketModel";

// Basket class
export class BasketModel implements IBasketModel {

  // Products list
  private _basketProducts: IProductItem[] = [];

  set basketProducts(data: IProductItem[]) {
    this._basketProducts = data;
  }

  get basketProducts() {
    return this._basketProducts;
  }

  // Total number of items in the basket
  getBasketCount(): number {
    return this._basketProducts.length;
  }

  // Total sum of items in the basket
  sumAllBasketItems(): number {
    return this._basketProducts.reduce((sum, item) => sum + item.price, 0);
  }

  // Add item to the basket
  setSelectedCard(data: IProductItem): void {
    this._basketProducts.push(data);
  }

  // Delete item in the basket
  deleteCardFromBasket(item: IProductItem): void {
    this._basketProducts = this._basketProducts.filter(product => product !== item);
  }

  // Clean the basket
  clearBasketItems(): void {
    this._basketProducts = [];
  }
}