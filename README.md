## Getting Started

This is a sample shopping basket project written in node.js / TypeScript

Not that hard to implement to your own project. 
- Supports extendable product catalogue.
- Baskets created with unique identifiers.
- Supports offer / discount conditions
- Supports delivery fee calculation / conditions




### Product Model 
Definition of a `Product`. Bare minimum fields are listed below. Can be extended with new values _(Category etc.)_

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| name:_string_ | Name of product | public  |
| code:_string_ | Unique identifier code of product | public  |
| price:_number_ | Price of the product | public  |


### ProductManager
Product catalogue that contains `Product` objects as an array and a method to retrieve a product using its code. 

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| products:_Product[] | Array of products in the catalogue | public  |
| `getProductFromCode(code:string)`| Returns the `Product` object from catalogue using the supplied 'code'. If no product found, returns `null` | public  |


### DeliveryChargeRule Model
Rules containing a price range for calculating the delivery price of basket .  

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| name:_string_ | Name of the delivery rule | Public  |
| min:_number_ | Min basketSubTotal of this deliverFee | public  |
| max:_number_ | Max basketSubTotal of this deliverFee | public  |
| deliveryFee:_number_ | Delivery price for baskets matching criteria | public  |


### DeliveryChargeRuleManager
Delivery calculator containing an array of `DeliveryChargeRule` objects and a method get the delivery fee using the supplied `basketSubTotal` parameter.

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| rules:_DeliveryChargeRule[] | Array of DeliveryChargeRules | public  |
| `getSuitableRule(basketSubTotal: number)`| Retrieves returns the rule matching the supplied basketSubTotal. If no match found, returns `null` | public  |


### Discount Model
Discount to be applied to the basket during basket total calculation.

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| name:_string_ | Name / Text to be shown for discount | readonly  |
| amount:_number_ | amount of the discount to be applied | readonly  |


### Offer Model
Base class for Offers that can be applied to basket. All offers should confront these requirements listed below :
- Offers should be extended from this base `Offer` class.
- Offer subClasses should be located in `/src/offer/offerTypes` directory. 
- Offer subClasses should have filenames starting with '`offer`' prefix.
- Offer subClasses should be exported in `/src/offer/offerTypes/index.ts` file.
- Offer subClasses should supply an `evaluate(basket:Basket)` method.
- `evaluate(basket:Basket)` method should return a `Discount` condition is complies. Otherwise, it should return `null`.


| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| name:_string_ | Name of the offer | public  |
| type:_string_ | Name of the offerType file without the "offer" prefix.  | public  |
| values:_Object_ | Values which will be used during evaluation are to be supplied over this object   | public  |
| `evaluate(basket:Basket)` | Method used for evaluating to see if the supplied basket is qualifed for this offer | public 


### OfferManager
Offer manager containing an array of `Offer` objects. The constructor method uses the input objects' `type` property and casts the input objects to their related types, then adds them to `offers` array.
`applySuitableDiscounts(basket:Basket)` method is called from the basket.total method to calculate the available discounts from qualified offers.

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| offers:Offer[] | Array of available offers  | public  |
| `applySuitableDiscounts(basket:Basket)`| Evaluates the basket with all available offers, returns an array of `Discount` objects. | public  |


### BasketItem Model
The smallest buildin piece of `Basket` object. 

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| basketId:_any_ | Unique Identifier of the basket that this BasketItem belongs to. | public
| product:_Product_ | Product object  | public  |
| count:_number_ | Amount of the product in the basket | public  |

### Basket model
Created using the `BasketManager.create` method.

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| basketId:_any_ | Unique Identifier of the basket. | public
| _productManager:ProductManager | ProductManager instance | private
| _deliveryChargeRuleManager:DeliveryChargeRuleManager | DeliveryChargeRuleManager instance | private
| _offerManager: OfferManager | OfferManager instance | private
| items:BasketItem[]_ | Array of `BasketItem` objects added to the basket. | public  |
| discounts:_Discount[]_ | Array of the `Discount` objects added to basket | public  |
| `bankersRound(num,decimalPlaces)` | A helper method for rounding | private  |
| `add(code:string, count:number=1)` | Method for adding products to the basket. If same product exists in basket, the new count will be added to existing product count.  | public  |
| `total()` | Method that calculates the basket total, discounts and delivery fee. (Also prints them out) | public  |


### BasketManager
Used for creating and retrieving `Basket` objects.

| Parameter                            | Functionality                                            | Access  |
| ----------------------------------- | -------------------------------------------------------- | ------- |
| baskets:_Basket[]_ | An array of existing `Basket` objects| public
| productManager:ProductManager | ProductManager instance | public
| deliveryChargeRuleManager:DeliveryChargeRuleManager | DeliveryChargeRuleManager instance | public
| offerManager: OfferManager | OfferManager instance | public
| `create(basketIdentifier:any)` | Method for creating a new basket object using the supplied unique basket identifier.  | public  |
| `get(basketIdentifier:any)` | Method that retrieves the basket with the supplied identifier. If no basket found, returns `null`) | public  |



## Additional Informations



## Clone repository & Run

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

To clone the repository, use the following commands:

```sh
git clone https://github.com/EErbek/ls-basket
cd ls-basket
npm install
npm run build
npm start
```

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `start` - run the transpiled project,
- `test` - run tests,

## About Repository Template

This repository uses node-typescript-boilerplate as template which you can find over **[here][repo-template-action]**

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/EErbek/ls-basket/blob/main/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.5-blue.svg

[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2016.13-blue.svg

[nodejs]: https://nodejs.org/dist/latest-v14.x/docs/api/

[gha-badge]: https://github.com/jsynowiec/node-typescript-boilerplate/actions/workflows/nodejs.yml/badge.svg

[gha-ci]: https://github.com/jsynowiec/node-typescript-boilerplate/actions/workflows/nodejs.yml

[typescript]: https://www.typescriptlang.org/

[typescript-4-5]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html

[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg

[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE

[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg

[sponsor]: https://github.com/sponsors/jsynowiec

[jest]: https://facebook.github.io/jest/

[eslint]: https://github.com/eslint/eslint

[wiki-js-tests]: https://github.com/jsynowiec/node-typescript-boilerplate/wiki/Unit-tests-in-plain-JavaScript

[prettier]: https://prettier.io

[volta]: https://volta.sh

[volta-getting-started]: https://docs.volta.sh/guide/getting-started

[volta-tomdale]: https://twitter.com/tomdale/status/1162017336699838467?s=20

[gh-actions]: https://github.com/features/actions

[repo-template-action]: https://github.com/jsynowiec/node-typescript-boilerplate/generate
