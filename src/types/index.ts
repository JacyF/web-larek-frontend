
// Interface for products
export interface IProduct {
    id: number;
    category: string;
    title: string;
    image: string;
    price: number | null;
    description: string;
}

// Interface for Form Orders
export interface IOrderForm {
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
    total?: string | number;
}

// Interface for Lot of orders
export interface IOrderLots {
    payment: string;
    email: string;
    address: string;
    phone: string;
    total: number;
    items: string[];
}

// Interface for Orders
export interface IOrder extends IOrderForm {
    items: string[];
}

// Interface for final order
export interface IOrderFinalResult {
    id: string;
    total: number;
}