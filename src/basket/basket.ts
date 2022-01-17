import { BasketItem } from './basketItem';
import { Discount } from '../offer/discount';
import { ProductManager } from '../product/productManager';
import { DeliveryChargeRuleManager } from '../delivery/deliveryChargeRuleManager';
import { OfferManager } from '../offer/offerManager';

export class Basket {

  public items: BasketItem[] = [];
  public discounts: Discount[] = [];

  constructor(
    public basketId: string|number, // Can be a string or number depending of requirements.
    private _productManager: ProductManager,
    private _deliveryChargeRuleManager: DeliveryChargeRuleManager,
    private _offerManager: OfferManager,
  ) {
  }

  // A rounding method playing nice with financial issues.
  private bankersRound (num, decimalPlaces) {
    const d = decimalPlaces || 0;
    const m = Math.pow(10, d);
    const n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    const i = Math.floor(n), f = n - i;
    const e = 1e-8; // Allow for rounding errors in f
    const r = (f > 0.5 - e && f < 0.5 + e) ?
      ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
  }


  // Count is optional.
  add(code: string, count = 1) {
    // Check for possible errors
    if (count <= 0) return { success: false, error: 'INVALID_COUNT' };
    const productToAdd = this._productManager.getProductFromCode(code);
    if (productToAdd == null) return { success: false, error: 'INVALID_PRODUCT' };

    // Check if there is already an item of same product in basket.
    for (const item of this.items) {
      if (item.product.code == code) {
        // Add new count to the existing.
        item.count += count;
        return { success: true };
      }
    }

    // Add a new BasketItem
    this.items.push(new BasketItem(this.basketId, productToAdd, count));
    return { success: true };
  }

  total() {
    // Check against all offers and apply discounts
    this.discounts = this._offerManager.applySuitableDiscounts(this);
    // Get total of all discounts
    const basketDiscountTotal =  this.discounts.reduce((acc, cur) => acc + (this.bankersRound(cur.amount,2)), 0);
    // Get total of all items.
    const basketItemsTotal = this.bankersRound(this.items.reduce((acc, cur) => acc + (cur.count *cur.product.price), 0),2);
    // The subTotal without the delivery fee
    const priceWithoutDeliveryFee = basketItemsTotal - basketDiscountTotal;
    // Get the delivery rule matching the calculated subTotal
    const deliveryChargeRule = this._deliveryChargeRuleManager.getSuitableRule(priceWithoutDeliveryFee);
    if(deliveryChargeRule == null)
      return {success: false, error:"NO_VALID_DELIVERY_RULE"};
    // The grand total.
    const grandTotal = priceWithoutDeliveryFee + deliveryChargeRule.deliveryFee;

    // Some console outputs for show purposes.
    console.log('Items Total: $'+basketItemsTotal)
    console.log('----------------------------------------------------------------')
    for (const basketItem of this.items) {
      console.log(basketItem.product.name + '\tx\t' + basketItem.count + '\t\t$' + this.bankersRound(basketItem.product.price,2) + '\t\t$' + (basketItem.count * basketItem.product.price).toFixed(2));
    }
    console.log('\nTotal Discount: $'+basketDiscountTotal)
    console.log('----------------------------------------------------------------')
    for (const discount of this.discounts) {
      console.log(discount.name + '\t\t\t\t-$' + this.bankersRound(discount.amount,2));
    }
    if(this.discounts.length == 0)
      console.log("No offers applied.")

    console.log("\nDelivery:")
    console.log('----------------------------------------------------------------')
    console.log(deliveryChargeRule.name + '\t\t\t\t\t$' + deliveryChargeRule.deliveryFee.toFixed(2));
    console.log('\nGrand Total : $' + grandTotal.toFixed(2));

    return { success: true, total:grandTotal }
  }

}
