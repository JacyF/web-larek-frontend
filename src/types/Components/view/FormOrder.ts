// Order interface
export interface IOrder {
  orderForm: HTMLFormElement;
  manageAllButton: HTMLButtonElement[];
  paymentSelection: String;
  render(): HTMLElement;
}