
// Selecting payment method and enter shipping adress
export interface IOrder {
    formOrder: HTMLFormElement;
    buttonAll: HTMLButtonElement[];
    paymentSelection: String;
    render(): HTMLElement;
}