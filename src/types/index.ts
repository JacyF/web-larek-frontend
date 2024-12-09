// Products item interface
export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Actions performing interface
export interface IActions {
  onClick: (event: MouseEvent) => void;
}

// Order form interface
export interface IOrderForm {
payment?: string;
address?: string;
phone?: string;
email?: string;
total?: string | number;
}

// Order interface
export interface IOrder extends IOrderForm {
  items: string[];
}

// Order Lot interface
export interface IOrderLot{
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

// Order Result interface
export interface IOrderResult {
  id: string;
  total: number;
}

// Form error type
export type FormErrors = Partial<Record<keyof IOrder, string>>;