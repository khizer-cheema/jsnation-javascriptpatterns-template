// You are working on an e-commerce website where users can customize their orders with optional add-ons such as gift wrapping, expedited shipping, and personal messages. Implement a system to add these optional features to the base order.
/**
 * This is a classic Decorator Pattern: you start with a base order, then “decorate” it with optional features (gift wrap, expedited shipping, personal message) without modifying the base class.
 */
// 🎁 Base Component
class Order {
  getDescription() {
    return "Base Order";
  }

  getCost() {
    return 50; // base cost
  }
}

// 🧩 Decorator Base Class
class OrderDecorator {
  constructor(order) {
    this.order = order;
  }

  getDescription() {
    return this.order.getDescription();
  }

  getCost() {
    return this.order.getCost();
  }
}

// 🎀 Concrete Decorators
class GiftWrap extends OrderDecorator {
  getDescription() {
    return `${this.order.getDescription()} + Gift Wrapping`;
  }

  getCost() {
    return this.order.getCost() + 5;
  }
}

class ExpeditedShipping extends OrderDecorator {
  getDescription() {
    return `${this.order.getDescription()} + Expedited Shipping`;
  }

  getCost() {
    return this.order.getCost() + 15;
  }
}

class PersonalMessage extends OrderDecorator {
  getDescription() {
    return `${this.order.getDescription()} + Personal Message`;
  }

  getCost() {
    return this.order.getCost() + 3;
  }
}

// --- 🎮 Client Code ---
let order = new Order();
console.log(order.getDescription(), "=", order.getCost());

// Add Gift Wrap
order = new GiftWrap(order);
console.log(order.getDescription(), "=", order.getCost());

// Add Expedited Shipping
order = new ExpeditedShipping(order);
console.log(order.getDescription(), "=", order.getCost());

// Add Personal Message
order = new PersonalMessage(order);
console.log(order.getDescription(), "=", order.getCost());
