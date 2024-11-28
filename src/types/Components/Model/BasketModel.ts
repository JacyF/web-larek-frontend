import { IProduct } from "../..";

// Managing data entered by user
export interface IBasketModel {
  basketProducts: IProduct[];
  getCounter: () => number;
  getSumAllProducts: () => number;
  setSelectedСard(data: IProduct): void;
  deleteCardToBasket(item: IProduct): void;
  clearBasketProducts(): void
}