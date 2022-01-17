import { Basket } from '../basket/basket';
import { Discount } from './discount';

export class Offer {
  constructor(public name, public type, public values) {
  }

  evaluate:(basket:Basket) => Discount;
}
