// Form interface
export interface IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	addOrderAddress(field: string, value: string): void;
	validateOrder(): boolean;
	setOrderInfo(field: string, value: string): void;
	validateContactInfo(): boolean;
	getOrderLot(): Record<string, unknown>;
}