import { IOrderFinalResult, IOrderLots, IProduct } from "../..";

// Fetching Data
export interface IApiModel {
  cdnUrl: string;
  items: IProduct[];
  getListProductCard: () => Promise<IProduct[]>;
  postOrderLot: (order: IOrderLots) => Promise<IOrderFinalResult>;
}