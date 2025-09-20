// You are developing a logging system for a web application. Implement a logger class to ensure that only one instance of the logger exists throughout the application.
/**
 * This is a classic Singleton Pattern use case: we want one single logger instance across the whole application, no matter how many times we “create” it.
 * Why Singleton for Logger?
Ensures only one logger exists → prevents multiple log files/streams.

Centralized logging → all modules share the same instance.

Easier debugging → one consistent log history.
 */
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance; // ✅ Always return the existing instance
    }

    this.logs = []; // store all logs
    Logger.instance = this; // save the first created instance
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}`;
    this.logs.push(logEntry);
    console.log(logEntry);
  }

  getLogs() {
    return this.logs;
  }
}

// --- Example Usage ---
// These will all refer to the SAME instance
const logger1 = new Logger();
const logger2 = new Logger();

logger1.log("User logged in.");
logger2.log("User clicked a button.");

console.log("Logger1 === Logger2 ?", logger1 === logger2); // true
console.log("All logs:", logger1.getLogs());
