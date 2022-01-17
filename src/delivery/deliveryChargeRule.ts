export class DeliveryChargeRule {

  constructor(
    public name: string,
    public min: number,
    public max: number,
    public deliveryFee: number) {
  }

}
