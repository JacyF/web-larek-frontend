import { IActions, IProductItem } from "../../types";
import { ICard } from "../../types/Components/view/Card";
import { IEvents } from "../base/events";
import { Card } from "./Card";

// Card preview item class
export class CardPreview extends Card implements ICard {
  text: HTMLElement;
  button: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    super(template, events, actions);
    this.text = this._cardElement.querySelector('.card__text')!;
    this.button = this._cardElement.querySelector('.card__button')!;
    this.setupButton();
  }

  private setupButton(): void {
    this.button.addEventListener('click', () => {
      this.events.emit('card:addBasket');
    });
  }

  private updateButtonState(data: IProductItem): string {
    if (data.price) {
      this.button.removeAttribute('disabled');
      return 'Купить';
    } else {
      this.button.setAttribute('disabled', 'true');
      return 'Не продается';
    }
  }

  render(data: IProductItem): HTMLElement {
    this.cardCategory = data.category;
    this._cardItemTitle.textContent = data.title;
    this._cardItemImage.src = data.image;
    this._cardItemImage.alt = data.title;
    this._cardItemPrice.textContent = this.setPrice(data.price);
    this.text.textContent = data.description;
    this.button.textContent = this.updateButtonState(data);
    return this._cardElement;
  }
}