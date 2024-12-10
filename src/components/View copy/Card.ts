// Importing
import { IActions, IProductItem } from "../../types";
import { ICard } from "../../types/Components/view/Card";
import { IEvents } from "../base/events";

// Card items class
export class Card implements ICard {
  protected _cardElement: HTMLElement;
  protected _cardItemCategory: HTMLElement;
  protected _cardItemTitle: HTMLElement;
  protected _cardItemImage: HTMLImageElement;
  protected _cardItemPrice: HTMLElement;
  protected _colors = <Record<string, string>>{
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  }
  
  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this._cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this._cardItemCategory = this._cardElement.querySelector('.card__category');
    this._cardItemTitle = this._cardElement.querySelector('.card__title');
    this._cardItemImage = this._cardElement.querySelector('.card__image');
    this._cardItemPrice = this._cardElement.querySelector('.card__price');
    
    if (actions?.onClick) {
      this._cardElement.addEventListener('click', actions.onClick);
    }
  }

  protected setText(element: HTMLElement, value: unknown): string {
    if (element) {
      return element.textContent = String(value);
    }
  }

  set cardCategory(value: string) {
    this.setText(this._cardItemCategory, value);
    this._cardItemCategory.className = `card__category card__category_${this._colors[value]}`
  }

  protected setPrice(value: number | null): string {
    if (value === null) {
      return 'Бесценно'
    }
    return String(value) + ' синапсов'
  }

  render(data: IProductItem): HTMLElement {
    this._cardItemCategory.textContent = data.category;
    this.cardCategory = data.category;
    this._cardItemTitle.textContent = data.title;
    this._cardItemImage.src = data.image;
    this._cardItemImage.alt = this._cardItemTitle.textContent;
    this._cardItemPrice.textContent = this.setPrice(data.price);
    return this._cardElement;
  }
}