import { DeliveryChargeRule } from './deliveryChargeRule';

export class DeliveryChargeRuleManager {

  constructor(public rules: DeliveryChargeRule[] = []) {
  }

  public getSuitableRule(basketSubTotal: number) {
    for (const rule of this.rules) {
      if (basketSubTotal >= rule.min && basketSubTotal < rule.max)
        return rule;
    }
    return null;
  }

}
