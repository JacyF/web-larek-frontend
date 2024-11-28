import { IProduct } from "../..";

// Store data
export interface IDataModel {
    productCards: IProduct[];
    selectedСard: IProduct;
    setPreview(item: IProduct): void;
}