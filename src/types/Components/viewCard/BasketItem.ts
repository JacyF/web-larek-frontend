// Importing
import { IProductItem } from '../..';

// Basket of items interface
export interface IBasketItem {
	basketItem: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;
	render(data: IProductItem, itemIndex: number): HTMLElement;
}