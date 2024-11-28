import { IProduct } from "../..";

// Render card products
export interface ICard {
    text: HTMLElement;
    button: HTMLElement;
    render(data: IProduct): HTMLElement;
}