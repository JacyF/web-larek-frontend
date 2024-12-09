// Importing
import { IProductItem } from "../..";

// Basket interface
export interface IBasketModel {
  basketProducts: IProductItem[];
  getBasketCount: () => number;
  sumAllBasketItems: () => number;
  setSelectedCard(data: IProductItem): void;
  deleteCardFromBasket(item: IProductItem): void;
  clearBasketItems(): void;
}