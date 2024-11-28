import { IProduct } from "../..";

export interface IDataModel {
    productCards: IProduct[];
    selectedСard: IProduct;
    setPreview(item: IProduct): void;
}

