import { IProduct } from "../..";

export interface IBasketModel {
  basketProducts: IProduct[];
  getCounter: () => number;
  getSumAllProducts: () => number;
  setSelectedСard(data: IProduct): void;
  deleteCardToBasket(item: IProduct): void;
  clearBasketProducts(): void
}