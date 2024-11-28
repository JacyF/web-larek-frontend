import { IProduct } from "../..";

// Render card products
export interface ICard {
    render(data: IProduct): HTMLElement;
}

export interface ICardSettings {
    text: HTMLElement;
    button: HTMLElement;
    render(data: IProduct): HTMLElement;
}

