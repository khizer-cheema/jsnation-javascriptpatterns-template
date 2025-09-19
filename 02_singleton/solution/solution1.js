const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

const users = {
  user1: "password1",
  user2: "password2",
};

// Singleton using closure
const SessionManager = (() => {
  let instance; // private variable to hold the single instance

  function createInstance() {
    const store = new session.MemoryStore();

    return {
      getSessionMiddleware: () =>
        session({
          secret: "some_secret",
          resave: false,
          saveUninitialized: true,
          store: store,
          cookie: { maxAge: 60000 },
        }),
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

// Use singleton
const sessionManager = SessionManager.getInstance();
const sessionMiddleware = sessionManager.getSessionMiddleware();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// Middleware for authentication
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

// Routes
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });

  if (users[username] && users[username] === password) {
    req.session.userId = username;
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome to your dashboard, ${req.session.userId}`);
});

app.post("/logout", isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.clearCookie("connect.sid");
    res.send("Logout successful");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/* const SessionManager = (() => {
  private variables/functions live here

  return {
    getInstance: () => { ... },
  };
})();
🔹
EXPLANATION:

(() => { ... })() → this is an Immediately Invoked Function Expression (IIFE).

It defines a function () => { ... }.

Then () at the end immediately executes it.

Whatever that function returns becomes the value of SessionManager.In this case it returns getInstance.
SessionManager = { getInstance: [Function] }

instance is a private variable. Nobody outside can touch it.

createInstance makes the real object (with getSessionMiddleware).

Only the IIFE has access to these. This is encapsulation.
Only getInstance is returned (public API).

When you call SessionManager.getInstance(), it checks if instance already exists:

If not → create one using createInstance().

If yes → just return the same one.

This ensures only one instance exists (singleton).

SessionManager.getInstance() → runs the closure inside.

If instance is undefined → create it.

If called again later → reuse the same one.

The returned object has getSessionMiddleware, which actually gives back the configured Express middleware.
🔹

What is a 🔹Closure?🔹
A closure happens when an inner function “remembers” and keeps access to variables from its outer function’s scope, even after the outer function has finished running.

Think of it like the inner function carrying a backpack 👜 with all the variables it needs from the outer scope.

🔹 Simple Example
function outer() {
  let count = 0; // variable in outer scope

  return function inner() {
    count++; // inner can "see" and use count
    return count;
  };
}

const counter = outer();  // outer runs once
console.log(counter());   // 1
console.log(counter());   // 2
console.log(counter());   // 3
Here:

outer() finishes execution.

But inner() still has access to count because of closure.

That’s why counter() remembers the value across calls.
IN OUR CASE:
getInstance is an inner function.

It closes over the variable instance defined in the outer IIFE.

Even though the IIFE runs only once and finishes, getInstance still remembers instance.

This is how your singleton works: the closure preserves the private state (instance) across multiple calls.
*/
