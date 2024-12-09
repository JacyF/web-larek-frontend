// Importing
import { IBasket } from "../../types/Components/View/Basket";
import { IEvents } from "../base/events";

// Basket class
export class Basket implements IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  shoppingBasket: HTMLElement;
  button: HTMLButtonElement;
  basketTotalPrice: HTMLElement;
  shoppingBasketButton: HTMLButtonElement;
  shoppingBasketCounter: HTMLElement;

  constructor(template: HTMLTemplateElement, private events: IEvents) {
    const clonedContent = template.content.cloneNode(true) as DocumentFragment;

    this.basket = clonedContent.querySelector('.basket')!;
    this.title = this.basket.querySelector('.modal__title')!;
    this.shoppingBasket = this.basket.querySelector('.basket__list')!;
    this.button = this.basket.querySelector('.basket__button')!;
    this.basketTotalPrice = this.basket.querySelector('.basket__price')!;
    this.shoppingBasketButton = document.querySelector('.header__basket')!;
    this.shoppingBasketCounter = document.querySelector('.header__basket-counter')!;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.button.addEventListener('click', () => this.events.emit('order:open'));
    this.shoppingBasketButton.addEventListener('click', () => this.events.emit('basket:open'));
  }

  set items(items: HTMLElement[]) {
    if (items.length > 0) {
      this.shoppingBasket.replaceChildren(...items);
      this.button.removeAttribute('disabled');
    } else {
      this.button.setAttribute('disabled', 'true');
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Корзина пуста';
      this.shoppingBasket.replaceChildren(emptyMessage);
    }
  }

  rendershoppingBasketCounter(value: number): void {
    this.shoppingBasketCounter.textContent = value.toString();
  }

  rendersumAllBasketItems(sumAll: number): void {
    this.basketTotalPrice.textContent = `${sumAll} синапсов`;
  }

  render(): HTMLElement {
    this.title.textContent = 'Корзина';
    return this.basket;
  }
}