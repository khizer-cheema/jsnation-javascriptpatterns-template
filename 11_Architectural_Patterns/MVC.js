// ========================
// 🟢 MODEL
// ========================
class TodoModel {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    return this.todos;
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
    return this.todos;
  }

  getTodos() {
    return this.todos;
  }
}

// ========================
// 🔵 VIEW
// ========================
class TodoView {
  showTodos(todos) {
    console.log("\n📋 Current To-Do List:");
    if (todos.length === 0) {
      console.log("   (No tasks yet)");
    } else {
      todos.forEach((todo, index) => {
        console.log(`   ${index + 1}. ${todo}`);
      });
    }
    console.log("-------------------------");
  }

  showMessage(message) {
    console.log(message);
  }
}

// ========================
// 🔴 CONTROLLER
// ========================
class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  addTodo(todo) {
    this.model.addTodo(todo);
    this.view.showMessage(`✅ Added: "${todo}"`);
    this.view.showTodos(this.model.getTodos());
  }

  removeTodo(index) {
    const todos = this.model.getTodos();
    if (index < 0 || index >= todos.length) {
      this.view.showMessage("⚠️ Invalid index!");
      return;
    }
    const removed = todos[index];
    this.model.removeTodo(index);
    this.view.showMessage(`❌ Removed: "${removed}"`);
    this.view.showTodos(this.model.getTodos());
  }

  showTodos() {
    this.view.showTodos(this.model.getTodos());
  }
}

// ========================
// 🎮 CLIENT CODE
// ========================
const model = new TodoModel();
const view = new TodoView();
const controller = new TodoController(model, view);

// simulate user interaction
controller.addTodo("Learn JavaScript");
controller.addTodo("Build an MVC App");
controller.addTodo("Practice Design Patterns");
controller.removeTodo(1);
controller.showTodos();
