import { Offer } from './offer';
import * as OfferType from './offerTypes';
import { Basket } from '../basket/basket';
import { Discount } from './discount';

export class OfferManager {

  public offers: Offer[] = [];

  constructor(_offersData: Offer[] = []) {
    for (const offer of _offersData) {
      const offerType = OfferType['Offer' + offer.type];
      this.offers.push(new offerType(offer.name, offer.type, offer.values));
    }
  }

  applySuitableDiscounts(basket: Basket) {
    const discountsToApply: Discount[] = [];
    this.offers.map(o => {
      for (const discount of o.evaluate(basket))
        discountsToApply.push(discount);
    });
    return discountsToApply;
  }
}
