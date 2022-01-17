import { Offer } from '../offer';
import { Basket } from '../../basket/basket';
import { Discount } from '../discount';

export class OfferNthForHalf extends Offer {

  values: {
    productCode: string,
    nth : number,
  }

  evaluate = (basket:Basket) => {
    for(const item of basket.items){
      if(item.product.code === this.values.productCode) {
        if(item.count >= this.values.nth) {
         return new Discount(this.name, item.product.price/2);
        }
      }
    }
    return null;
  }

}
