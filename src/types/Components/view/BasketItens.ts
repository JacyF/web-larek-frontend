import { IProduct } from "../..";

// Itens in the shopping cart
export interface IBasketItem {
    basketItem: HTMLElement;
    index: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    buttonDelete: HTMLButtonElement;
    render(data: IProduct, item: number): HTMLElement;
}