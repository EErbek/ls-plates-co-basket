import { Basket } from './basket';
import { ProductManager } from '../product/productManager';
import { DeliveryChargeRuleManager } from '../delivery/deliveryChargeRuleManager';
import { OfferManager } from '../offer/offerManager';

export class BasketManager {

  public baskets: Basket[] = [];

  constructor(
    public productManager: ProductManager,
    public deliveryChargeRuleManager: DeliveryChargeRuleManager,
    public offerManager: OfferManager,
  ) {
  }

  create(basketIdentifier) {
    // Check and return if already exists
    for (const basket of this.baskets)
      if (basket.basketId == basketIdentifier)
        return basket;

    // Create and return a new basket
    const basket = new Basket(basketIdentifier, this.productManager, this.deliveryChargeRuleManager, this.offerManager);
    this.baskets.push(basket);
    return basket;
  }

  get(basketIdentifier) {
    for (const basket of this.baskets) {
      if (basket.basketId === basketIdentifier)
        return basket;
    }
    return null;
  }

}
