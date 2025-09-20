// You are building a game where different types of enemies need to be created dynamically. Implement a system to create different types of enemies such as 'Goblin', 'Orc', and 'Dragon'.
// Base Enemy class (common interface)
/**
 * This is a classic Factory Pattern scenario — we want to dynamically create different enemy types without hardcoding every “new Goblin()” all over the game logic.
 */
class Enemy {
  constructor(name, health, attackPower) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
  }

  attack() {
    console.log(`${this.name} attacks with power ${this.attackPower}!`);
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(
      `${this.name} takes ${damage} damage, remaining health: ${this.health}`
    );
  }
}

// Concrete Enemy types
class Goblin extends Enemy {
  constructor() {
    super("Goblin", 30, 5);
  }
}

class Orc extends Enemy {
  constructor() {
    super("Orc", 60, 12);
  }
}

class Dragon extends Enemy {
  constructor() {
    super("Dragon", 200, 25);
  }

  // Override attack with special ability
  attack() {
    console.log(`${this.name} breathes FIRE with power ${this.attackPower}!`);
  }
}

// Enemy Factory
class EnemyFactory {
  static createEnemy(type) {
    switch (type) {
      case "Goblin":
        return new Goblin();
      case "Orc":
        return new Orc();
      case "Dragon":
        return new Dragon();
      default:
        throw new Error(`Unknown enemy type: ${type}`);
    }
  }
}

// --- 🎮 Game Example ---
const enemies = [
  EnemyFactory.createEnemy("Goblin"),
  EnemyFactory.createEnemy("Orc"),
  EnemyFactory.createEnemy("Dragon"),
];

enemies.forEach((enemy) => {
  enemy.attack();
  enemy.takeDamage(10);
});
