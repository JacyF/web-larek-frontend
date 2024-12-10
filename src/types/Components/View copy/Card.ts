// Importing
import { IProductItem } from '../..';

// Card interface
export interface ICard {
	render(data: IProductItem): HTMLElement;
}