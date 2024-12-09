// Importing
import { IModal } from "../../types/Components/View/Modal";
import { IEvents } from "../base/events";

// Modal windows class
export class Modal implements IModal {
  protected modalWrapper: HTMLElement;
  protected modalCloseButton: HTMLButtonElement;
  protected _modalContent: HTMLElement;
  protected _pageWrapper: HTMLElement;

  constructor(modalWrapper: HTMLElement, protected events: IEvents) {
    this.modalWrapper = modalWrapper;
    this.modalCloseButton = modalWrapper.querySelector<HTMLButtonElement>('.modal__close')!;
    this._modalContent = modalWrapper.querySelector<HTMLElement>('.modal__content')!;
    this._pageWrapper = document.querySelector<HTMLElement>('.page__wrapper')!;

    this.modalCloseButton.addEventListener('click', this.close.bind(this));
    this.modalWrapper.addEventListener('click', this.close.bind(this));
    this.modalWrapper.querySelector<HTMLElement>('.modal__container')!
      .addEventListener('click', (event) => event.stopPropagation());
  }

  // Displaying in the modal content
  set viewContent(value: HTMLElement | null) {
    this._modalContent.replaceChildren(value || document.createTextNode(''));
  }

  // Opening modal
  open(): void {
    this.modalWrapper.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  // Closing modal
  close(): void {
    this.modalWrapper.classList.remove('modal_active');
    this.viewContent = null; // Clean content
    this.events.emit('modal:close');
  }

  // Blocking page scroll
  set wrapperLocked(value: boolean) {
    this._pageWrapper.classList.toggle('page__wrapper_locked', value);
  }

  render(): HTMLElement {
    this.open();
    return this.modalWrapper;
  }
}
