// Importing
// import { IActions, IProductItem } from '../../types';
// import { IBasketItem } from '../../types/Components/view/BasketItem';
// // import { IBasketItem } from '../../types/Components/view/BasketItem';
// import { IEvents } from '../base/events';

import { IActions, IProductItem } from "../../types";
import { IBasketItem } from "../../types/Components/view/BasketItem";
import { IEvents } from "../base/events";

// Basket of items class
export class BasketItem implements IBasketItem {
	basketItem: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;

	constructor(
		template: HTMLTemplateElement,
		private events: IEvents,
		private actions?: IActions
	) {
		const clonedContent = template.content.cloneNode(true) as DocumentFragment;

		this.basketItem = clonedContent.querySelector('.basket__item')!;
		this.index = this.basketItem.querySelector('.basket__item-index')!;
		this.title = this.basketItem.querySelector('.card__title')!;
		this.price = this.basketItem.querySelector('.card__price')!;
		this.buttonDelete = this.basketItem.querySelector('.basket__item-delete')!;

		this.setupDeleteAction();
	}

	private setupDeleteAction(): void {
		if (this.actions?.onClick) {
			this.buttonDelete.addEventListener('click', this.actions.onClick);
		}
	}

	private setPrice(value: number | null): string {
		return value === null ? 'Бесценно' : `${value} синапсов`;
	}

	render(data: IProductItem, itemIndex: number): HTMLElement {
		this.index.textContent = itemIndex.toString();
		this.title.textContent = data.title;
		this.price.textContent = this.setPrice(data.price);
		return this.basketItem;
	}
}