// Importing
import { IProductItem } from '../..';

// Card interface
export interface ICard {
	text: HTMLElement;
	button: HTMLElement;
	render(data: IProductItem): HTMLElement;
}