// Importing
import { IProductItem } from '../..';

// Data interface
export interface IDataModel {
	catalogItems: IProductItem[];
	selectedItem: IProductItem | null;
	setPreview(item: IProductItem): void;
}