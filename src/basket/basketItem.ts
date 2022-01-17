import { Product } from '../product/product';

export class BasketItem {

  constructor(
    public basketId: string|number,
    public product: Product,
    public count: number) {
  }
}
