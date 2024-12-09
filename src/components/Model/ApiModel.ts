
// Importing
import { ApiListResponse, Api } from '../base/api'
import { IOrderLot, IOrderResult, IProductItem } from '../../types';

// API class
export class ApiModel extends Api {
  cdnUrl: string;
  items: IProductItem[];

  constructor(cdnUrl: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdnUrl = cdnUrl;
  }

  // Receiving an array of abjects from server
  getListProductCard(): Promise<IProductItem[]> {
    return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdnUrl + item.image,
      }))
    );
  }

  // Response from server
  postOrderLot(order: IOrderLot): Promise<IOrderResult> {
    return this.post(`/order`, order).then((data: IOrderResult) => data);
  }
}
