import { Product } from './product';

export class ProductManager {
  constructor(public products: Product[] = []) {
  }

  public getProductFromCode(code: string) {
    for (const product of this.products) {
      if (product.code === code)
        return product;
    }
    return null;
  }
}
