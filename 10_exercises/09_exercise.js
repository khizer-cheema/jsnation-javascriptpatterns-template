// You are developing a remote control application for a smart home system. Implement a system to represent various actions such as turning lights on/off, adjusting thermostat settings, and locking doors, as command objects that can be executed and undone.

/**Perfect scenario for the Command Pattern
 *Each smart home action (turning lights on/off, adjusting thermostat, locking/unlocking doors) is represented as a Command object.
 *The RemoteControl (Invoker) executes or undoes commands.
 *This allows us to queue, undo, or even redo actions dynamically.
 */

//Command Interface
class Command {
  execute() {}
  undo() {}
}

// --- Receivers (actual devices) ---
class Light {
  on() {
    console.log("💡 Light is ON");
  }
  off() {
    console.log("💡 Light is OFF");
  }
}

class Thermostat {
  setTemperature(temp) {
    this.temp = temp;
    console.log(`🌡️ Thermostat set to ${temp}°C`);
  }
  reset() {
    console.log("🌡️ Thermostat reset to default");
  }
}

class DoorLock {
  lock() {
    console.log("🔒 Door is LOCKED");
  }
  unlock() {
    console.log("🔓 Door is UNLOCKED");
  }
}

// --- Concrete Commands ---
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.on();
  }
  undo() {
    this.light.off();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.off();
  }
  undo() {
    this.light.on();
  }
}

class SetTemperatureCommand extends Command {
  constructor(thermostat, temp) {
    super();
    this.thermostat = thermostat;
    this.temp = temp;
    this.prevTemp = null;
  }
  execute() {
    this.prevTemp = this.thermostat.temp;
    this.thermostat.setTemperature(this.temp);
  }
  undo() {
    if (this.prevTemp !== null) {
      this.thermostat.setTemperature(this.prevTemp);
    } else {
      this.thermostat.reset();
    }
  }
}

class LockDoorCommand extends Command {
  constructor(door) {
    super();
    this.door = door;
  }
  execute() {
    this.door.lock();
  }
  undo() {
    this.door.unlock();
  }
}

class UnlockDoorCommand extends Command {
  constructor(door) {
    super();
    this.door = door;
  }
  execute() {
    this.door.unlock();
  }
  undo() {
    this.door.lock();
  }
}

// --- Invoker: Remote Control ---
class RemoteControl {
  constructor() {
    this.history = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    } else {
      console.log("⚠️ Nothing to undo");
    }
  }
}

// --- 🎮 Client Code ---
const light = new Light();
const thermostat = new Thermostat();
const door = new DoorLock();

const remote = new RemoteControl();

remote.executeCommand(new LightOnCommand(light));
remote.executeCommand(new SetTemperatureCommand(thermostat, 22));
remote.executeCommand(new LockDoorCommand(door));

console.log("\n--- Undoing last 2 commands ---");
remote.undo(); // undo lock door
r;
