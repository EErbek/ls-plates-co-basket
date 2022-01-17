import { ProductManager } from '../src/product/productManager';
import { Product } from '../src/product/product';
import { DeliveryChargeRuleManager } from '../src/delivery/deliveryChargeRuleManager';
import { DeliveryChargeRule } from '../src/delivery/deliveryChargeRule';
import { OfferManager } from '../src/offer/offerManager';
import { Offer } from '../src/offer/offer';
import { BasketManager } from '../src/basket/basketManager';

const productManager = new ProductManager([
  new Product("Red Plate", "R01", 32.95),
  new Product("Green Plate", "G01", 24.95),
  new Product("Blue Plate", "B01", 7.95),
]);

// Populate delivery charger with sample delivery charge rules
const deliveryChargeRuleManager = new DeliveryChargeRuleManager([
  new DeliveryChargeRule("Standart Delivery Fee", Number.MIN_VALUE, 50, 4.95),
  new DeliveryChargeRule("Discounted Delivery Fee", 50, 90, 2.95),
  new DeliveryChargeRule("Free Delivery", 90, Number.MAX_VALUE, 0)
]);

// Populate offers with sample offers
const offerManager= new OfferManager([
  new Offer("Second Red Plate for Half Price","NthForX", {productCode: "R01", nth:2, discount:16.475}),
  new Offer("Second Blue Plate for Free","NthFree", {productCode: "B01", nth:2, discount:7.95})
]);

const basketManager = new BasketManager(productManager, deliveryChargeRuleManager, offerManager);



describe('Create Basket', () => {
  it('Creates a new basket with the supplied basket identifier', () => {
    basketManager.create("newBasket");
    expect(basketManager.baskets[0].basketId).toBe("newBasket");
  });
});

describe('Get Basket by basketIdentifier', () => {
  it('Gets the basket with the supplied basket identifier', () => {

    expect(basketManager.get("newBasket").basketId).toBe("newBasket");
  });
});


describe('Add a new item to basket', () => {
  it('Adds the first item in catalogue to the newly created basket', () => {
    const basket = basketManager.get("newBasket");
    const product = basketManager.productManager.products[0];
    expect(basket.add(product.code).success).toBe(true);
  });
});


describe('Calculate Delivery Fee', () => {
  it('Calculation of delivery fee', () => {
    expect(basketManager.deliveryChargeRuleManager.getSuitableRule(45).deliveryFee).toBe(4.95);
  });
});
