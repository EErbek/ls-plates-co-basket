import { Offer } from '../offer';
import { Basket } from '../../basket/basket';
import { Discount } from '../discount';

export class OfferNthForX extends Offer {

  values: {
    productCode: string,
    nth : number,
    discount: number
  }

  evaluate = (basket:Basket) => {
    for(const item of basket.items){
      if(item.product.code === this.values.productCode) {
        if(item.count >= this.values.nth) {
          return new Discount(this.name, this.values.discount);
        }
      }
    }
    return null;
  }

}
