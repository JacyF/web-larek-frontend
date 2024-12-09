// Importing
import { ISuccess } from "../../types/Components/View/Success";
import { IEvents } from "../base/events";

// Success class
export class Success implements ISuccess {
  orderSuccess: HTMLElement;
  orderSuccessDescription: HTMLElement;
  orderSucessClosebutton: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.orderSuccess = template.content.querySelector<HTMLElement>('.order-success')!.cloneNode(true) as HTMLElement;
    this.orderSuccessDescription = this.orderSuccess.querySelector<HTMLElement>('.order-success__description')!;
    this.orderSucessClosebutton = this.orderSuccess.querySelector<HTMLButtonElement>('.order-success__close')!;

    this.orderSucessClosebutton.addEventListener('click', () => {
      this.events.emit('success:close');
    });
  }

  render(total: number): HTMLElement {
    this.orderSuccessDescription.textContent = `Списано ${total} синапсов`;
    return this.orderSuccess;
  }
}
