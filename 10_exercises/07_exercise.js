// You are developing a weather monitoring application that needs to notify various components whenever the weather conditions change. Implement a system to allow components to subscribe to weather updates and react accordingly.

/**Perfect example of the Observer Pattern
 * Here, the Weather Station will act as the Subject (Publisher), and components like MobileApp, WebDashboard, or AlertSystem will be Observers (Subscribers). Whenever the weather changes, all observers get notified.
 */
//  Subject (Publisher)
class WeatherStation {
  constructor() {
    this.observers = []; // List of subscribers
    this.weatherData = null;
  }

  // Subscribe an observer
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Unsubscribe an observer
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Notify all observers
  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.weatherData));
  }

  // Update weather and notify
  setWeather(weatherData) {
    console.log(`🌤️ Weather updated: ${JSON.stringify(weatherData)}`);
    this.weatherData = weatherData;
    this.notifyObservers();
  }
}

// Observer Interface
class Observer {
  update(weatherData) {
    // To be implemented by concrete observers
  }
}

// Concrete Observers
class MobileApp extends Observer {
  update(weatherData) {
    console.log(
      `📱 MobileApp: Weather is now ${weatherData.temperature}°C and ${weatherData.condition}`
    );
  }
}

class WebDashboard extends Observer {
  update(weatherData) {
    console.log(
      `💻 WebDashboard: Displaying ${weatherData.condition} with ${weatherData.temperature}°C`
    );
  }
}

class AlertSystem extends Observer {
  update(weatherData) {
    if (weatherData.condition === "Storm") {
      console.log("🚨 AlertSystem: Sending storm alert!");
    }
  }
}

// --- 🎮 Client Code ---
const weatherStation = new WeatherStation();

// Create observers
const mobileApp = new MobileApp();
const webDashboard = new WebDashboard();
const alertSystem = new AlertSystem();

// Subscribe them
weatherStation.addObserver(mobileApp);
weatherStation.addObserver(webDashboard);
weatherStation.addObserver(alertSystem);

// Simulate weather updates
weatherStation.setWeather({ temperature: 28, condition: "Sunny" });
weatherStation.setWeather({ temperature: 22, condition: "Rainy" });
weatherStation.setWeather({ temperature: 18, condition: "Storm" });
