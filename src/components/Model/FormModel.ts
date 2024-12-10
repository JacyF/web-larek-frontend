// Importing
import { FormErrors } from "../../types";
import { IFormModel } from "../../types/Components/Model/FormModel";
import { IEvents } from "../base/events";

// Form class
export class FormModel implements IFormModel {
  payment = '';
  email = '';
  phone = '';
  address = '';
  total = 0;
  items: string[] = [];
  formErrors: FormErrors = {};

  constructor(private events: IEvents) {}

  // Getting costumer adress
  addOrderAddress(field: string, value: string): void {
    if (field === 'address') {
      this.address = value;
    }

    if (this.validateOrder()) {
      this.events.emit('order:ready', this.getOrderLot());
    }
  }

  // Validating order
  validateOrder(): boolean {
    const addressRegexp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;
    const errors: FormErrors = {};

    if (!this.address) {
      errors.address = 'Необходимо указать адрес';
    } else if (!addressRegexp.test(this.address)) {
      errors.address = 'Укажите настоящий адрес';
    }

    if (!this.payment) {
      errors.payment = 'Выберите способ оплаты';
    }

    this.formErrors = errors;
    this.events.emit('formErrors:address', this.formErrors);

    return Object.keys(errors).length === 0;
  }

  setOrderInfo(field: string, value: string): void {
    if (field === 'email') {
      this.email = value;
    } else if (field === 'phone') {
      this.phone = value.startsWith('8') ? '+7' + value.slice(1) : value;
    }

    if (this.validateContactInfo()) {
      this.events.emit('order:ready', this.getOrderLot());
    }
  }

  // Validating costumer information
  validateContactInfo(): boolean {
    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;
    const errors: FormErrors = {};

    if (!this.email) {
      errors.email = 'Необходимо указать email';
    } else if (!emailRegexp.test(this.email)) {
      errors.email = 'Некорректный адрес электронной почты';
    }

    if (!this.phone) {
      errors.phone = 'Необходимо указать телефон';
    } else if (!phoneRegexp.test(this.phone)) {
      errors.phone = 'Некорректный формат номера телефона';
    }

    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);

    return Object.keys(errors).length === 0;
  }

  // Loading order data
  getOrderLot() {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
      total: this.total,
      items: this.items,
    };
  }
}
