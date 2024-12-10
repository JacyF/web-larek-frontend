// Order interface
export interface IOrder {
  orderForm: HTMLFormElement;
  manageAllButton: HTMLButtonElement[];
  paymentSelection: String;
  formErrors: HTMLElement;
  render(): HTMLElement;
}