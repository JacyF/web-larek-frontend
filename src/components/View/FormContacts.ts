// Importing
// import { IContacts } from "../../types/Components/view/FormContacts";
// import { IContacts } from "../../types/Components/view/FormContacts";
// import { IEvents } from "../base/events";

import { IContacts } from "../../types/Components/view/FormContacts";
import { IEvents } from "../base/events";

// Contact class
export class Contacts implements IContacts {
  userContactForm: HTMLFormElement;
  inputAll: HTMLInputElement[];
  formSubmitButton: HTMLButtonElement;
  formErrors: HTMLElement;
  static valid: boolean;
  static formErrors: any;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.userContactForm = template.content.querySelector('.form')!.cloneNode(true) as HTMLFormElement;
    this.inputAll = Array.from(this.userContactForm.querySelectorAll<HTMLInputElement>('.form__input'));
    this.formSubmitButton = this.userContactForm.querySelector('.button')!;
    this.formErrors = this.userContactForm.querySelector('.form__errors')!;

    this.setupInputListeners();
    this.setupFormSubmit();
  }

  private setupInputListeners(): void {
    this.inputAll.forEach((input) => {
      input.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.events.emit('contacts:changeInput', { field: target.name, value: target.value });
      });
    });
  }

  private setupFormSubmit(): void {
    this.userContactForm.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('success:open');
    });
  }

  set valid(isValid: boolean) {
    this.formSubmitButton.disabled = !isValid;
  }

  render(): HTMLElement {
    return this.userContactForm;
  }
}
