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
    new Offer("Second Red Plate for Half Price","NthForHalf", {productCode: "R01", nth:2})
    // new Offer("Second Blue Plate for $2 Discount!","NthForX", {productCode: "B01", nth:2, discount:2 }),
  ]);

  return new BasketManager(productManager, deliveryChargeRuleManager, offerManager);
}

// Initialize the basket manager
const basketManager = initBasketManager();

// Create a new basket

// Add products to the newly created basket
console.log('##################################################################');
console.log('###################### RUNNING SAMPLES ###########################');
console.log('##################################################################');

// Sample Basket 1
console.log('\n\n####################### SAMPLE BASKET 1 ###########################');
const basket1 = basketManager.create("sb1");
basket1.add("B01");
basket1.add("G01");
basket1.total();

// Sample Basket 2
console.log('\n\n####################### SAMPLE BASKET 2 ###########################');
const basket2 = basketManager.create("sb2");
basket2.add("R01");
basket2.add("R01");
basket2.total();

// Sample Basket 3
console.log('\n\n####################### SAMPLE BASKET 3 ###########################');
const basket3 = basketManager.create("sb3");
basket3.add("R01");
basket3.add("G01");
basket3.total();

//Sample Basket 4
console.log('\n\n####################### SAMPLE BASKET 4 ###########################');
const basket4 = basketManager.create("sb4");
basket4.add("B01");
basket4.add("B01");
basket4.add("R01");
basket4.add("R01");
basket4.add("R01");
basket4.total();

