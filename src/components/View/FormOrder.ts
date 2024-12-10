// Importing
// import { IOrder } from "../../types/Components/view/FormOrder";
// import { IOrder } from "../../types/Components/view/FormOrder";
// import { IEvents } from "../base/events";

import { IOrder } from "../../types/Components/view/FormOrder";
import { IEvents } from "../base/events";

// Order class
export class Order implements IOrder {
  orderForm: HTMLFormElement;
  manageAllButton: HTMLButtonElement[];
  address: HTMLElement;
  buttonSubmit: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.orderForm = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.manageAllButton = Array.from(this.orderForm.querySelectorAll('.button_alt')); // Finding select payment method

    this.manageAllButton.forEach(item => {
      item.addEventListener('click', () => {
        this.paymentSelection = item.name;
        events.emit('order:paymentSelection', item);
      });
    });

    this.address = this.orderForm.querySelector('.form__input');
    this.buttonSubmit = this.orderForm.querySelector('.order__button');

    this.orderForm.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('contacts:open');
    });

    this.orderForm.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const field = target.name;
      const value = target.value;
      this.events.emit(`order:changeAddress`, { field, value });

      if (value) {
        this.buttonSubmit.disabled = false;
      } else {
        this.buttonSubmit.disabled = true;
      }
    });
  }

  // Border around selected payment method
  set paymentSelection(paymentMethod: string) {
    this.manageAllButton.forEach(item => {
      item.classList.toggle('button_alt-active', item.name === paymentMethod);
    })
  }

  render() {
    return this.orderForm
  }
}
