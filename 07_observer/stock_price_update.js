class Stock {
  constructor(symbol, price) {
    this.symbol = symbol;
    this.price = price;
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unSubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  setPrice(newPrice) {
    this.price = newPrice;
    this.notify();
  }
  notify() {
    this.observers.forEach((observer) =>
      observer.update(this.symbol, this.price)
    );
  }
}

class Investor {
  constructor(name) {
    this.name = name;
  }
  update(symbol, price) {
    console.log(`${this.name} notified: ${symbol} is now $${price}`);
  }
}

const stock = new Stock("PSO", 150);

const investor1 = new Investor("Ali");
const investor2 = new Investor("Kizer");

stock.subscribe(investor1);
stock.subscribe(investor2);

stock.setPrice(155);
