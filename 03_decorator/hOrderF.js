const BASIC_PIZZA_PRICE = 10;
const CHEESE_TOPPING_PRICE = 2;
const PEPPERONI_TOPPING_PRICE = 3;
const HOT_SAUCE_TOPPING_PRICE = 1;

function createPizza() {
  return { description: "Base_pizza", price: BASIC_PIZZA_PRICE };
}

const addTopping = (topping) => {
  return function (pizza) {
    const newDescription = `${pizza.description} with ${topping.description} topping`;
    const newPrice = pizza.price + topping.price;

    return { description: newDescription, price: newPrice };
  };
};
// 2. Function to apply multiple toppings at once
const createPizzaWithToppings = (toppings = []) => {
  // start with base pizza
  return toppings.reduce(
    (pizza, topping) => addTopping(topping)(pizza),
    createPizza()
  );
};

const cheese = { description: "cheese", price: CHEESE_TOPPING_PRICE };
const pepperoni = { description: "pepperoni", price: PEPPERONI_TOPPING_PRICE };
const hotSauce = { description: "hotSauce", price: HOT_SAUCE_TOPPING_PRICE };

const basePizza = createPizza();
basePizza;

//1.if using multiple topings like this.
const cheesePizza = addTopping(cheese)(basePizza);
cheesePizza;

const deluxePizza1 = addTopping(pepperoni)(cheesePizza);
deluxePizza1;

//2.use multiple toppings at once.
const deluxePizza = createPizzaWithToppings([cheese, pepperoni, hotSauce]);
deluxePizza;
