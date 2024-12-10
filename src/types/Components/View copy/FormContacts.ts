// Contact interface
export interface IContacts {
    userContactForm: HTMLFormElement;
    inputAll: HTMLInputElement[];
    formSubmitButton: HTMLButtonElement;
    formErrors: HTMLElement;
    render(): HTMLElement;
}