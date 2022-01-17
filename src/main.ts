import { Product } from './product/product';
import { ProductManager } from './product/productManager';
import { DeliveryChargeRule } from './delivery/deliveryChargeRule';
import { DeliveryChargeRuleManager } from './delivery/deliveryChargeRuleManager';
import { BasketManager } from './basket/basketManager';
import { OfferManager } from './offer/offerManager';
import { Offer } from './offer/offer';


const initBasketManager = () => {
  // Populate product catalogue with sample products
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
    new Offer("Second Blue Plate for $5","NthForX", {productCode: "B01", nth:2, discount:2.95 }),
    new Offer("Second Red Plate for Half Price","NthForHalf", {productCode: "R01", nth:2})
  ]);

  return new BasketManager(productManager, deliveryChargeRuleManager, offerManager);
}

// Initialize the basket manager
const basketManager = initBasketManager();

// Create a new basket
const basket = basketManager.create("user123");

// Add products to the newly created basket
basket.add("R01");
// basket.add("R01");
// basket.add("R01");
// basket.add("R01");
basket.add("B01");
// basket.add("B01");
basket.total();

