const BASIC_PIZZA_PRICE = 10;
const CHEESE_TOPPING_PRICE = 2;
const PEPPERONI_TOPPING_PRICE = 3;
const HOT_SAUCE_TOPPING_PRICE = 1;

class Pizza {
  constructor() {
    this.description = "Basic pizza";
  }
  getPrice() {
    return BASIC_PIZZA_PRICE;
  }
  getDescription() {
    return this.description;
  }
}
/**class ToppingDecorator { ... }
We’re declaring a class called ToppingDecorator.

It is not meant to be used directly, but as a base class for other toppings like Cheese, Pepperoni, etc.

It provides the "wrapping mechanism" for the Decorator Pattern.
 * constructor(Pizza) { ... }
The constructor is the function that runs whenever you do new ToppingDecorator(...) or new Cheese(...).

It takes one argument, named Pizza.

⚠️ Here Pizza is not the class — it’s an object instance of either:
  -the Pizza class
const customPizza = new Pizza();
 customPizza is passed as Pizza, 
or
  -another decorator(like Cheese, Pepperoni):
const cheesePizza = new Cheese(customPizza);  cheezerPizza is passed as Pizza.
 */

class ToppingDecorator {
  constructor(Pizza) {
    this.Pizza = Pizza;
  }
  getPrice() {
    return this.Pizza.getPrice();
  }
  getDescription() {
    return this.Pizza.getDescription();
  }
}

//cheeses decorator

class Cheese extends ToppingDecorator {
  constructor(pizza) {
    super(pizza);
    this.description = "cheese";
  }
  getPrice() {
    return this.Pizza.getPrice() + CHEESE_TOPPING_PRICE;
  }
  getDescription() {
    return ` ${this.Pizza.getDescription()}, ${this.description}`;
  }
}

//Pepperoni decorator

class Pepperoni extends ToppingDecorator {
  constructor(pizza) {
    super(pizza);
    this.description = "pepperoni";
  }
  getPrice() {
    return this.Pizza.getPrice() + PEPPERONI_TOPPING_PRICE;
  }
  getDescription() {
    return ` ${this.Pizza.getDescription()}, ${this.description}`;
  }
}

// Hot Sauce Decorator

class HotSauce extends ToppingDecorator {
  constructor(pizza) {
    super(pizza);
    this.description = "hot sauce";
  }
  getPrice() {
    return this.pizza.getPrice() + HOT_SAUCE_TOPPING_PRICE;
  }
  getDescription() {
    return `${this.pizza.getDescription()}, ${this.description}`;
  }
}

let customPizza = new Pizza();
console.log(customPizza.getDescription());
console.log(customPizza.getPrice());

let cheesePizza = new Cheese(customPizza);
console.log(cheesePizza.getDescription());
console.log(cheesePizza.getPrice());

let pepperoniPizza = new Pepperoni(customPizza);
console.log(pepperoniPizza.getDescription());
console.log(pepperoniPizza.getPrice());

let deluxePizza = new Cheese(new Pepperoni(customPizza));
console.log(deluxePizza.getDescription());
console.log(deluxePizza.getPrice());
