// Importing
export interface IBasket {
	basket: HTMLElement;
	title: HTMLElement;
	shoppingBasket: HTMLElement;
	button: HTMLButtonElement;
	basketTotalPrice: HTMLElement;
	shoppingBasketButton: HTMLButtonElement;
	shoppingBasketCounter: HTMLElement;
	rendershoppingBasketCounter(value: number): void;
	rendersumAllBasketItems(sumAll: number): void;
	render(): HTMLElement;
}