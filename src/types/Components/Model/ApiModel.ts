// Importing
import { IOrderLot, IOrderResult, IProductItem } from "../..";

// API interface
export interface IApiModel {
  cdnUrl: string;
  items: IProductItem[];
  getListProductCard: () => Promise<IProductItem[]>;
  postOrderLot: (order: IOrderLot) => Promise<IOrderResult>;
}