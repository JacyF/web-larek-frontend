import { IOrderFinalResult, IOrderLots, IProduct } from "../..";

export interface IApiModel {
  cdnUrl: string;
  items: IProduct[];
  getListProductCard: () => Promise<IProduct[]>;
  postOrderLot: (order: IOrderLots) => Promise<IOrderFinalResult>;
}

// cdn = cdnUrl