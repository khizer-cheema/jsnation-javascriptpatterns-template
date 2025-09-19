const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

// Dummy users
const users = {
  user1: "password1",
  user2: "password2",
};

// Secret key for JWT signing (use env var in production!)
const JWT_SECRET = "super_secret_jwt_key";

// Middleware: authenticate with JWT
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).send("Unauthorized: Invalid token format");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden: Invalid or expired token");
    }
    req.user = decoded; // save decoded payload (e.g. username)
    next();
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login → returns JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    // Sign token (expires in 1h)
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).send("Invalid username or password");
  }
});

// Dashboard (protected route)
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome to your dashboard, ${req.user.username}`);
});

// Logout (with JWT there’s no server state to destroy)
app.post("/logout", (req, res) => {
  // Option 1: just tell client to delete token
  res.json({
    message: "Logout successful. Please delete token on client side.",
  });
  // Option 2 (advanced): use a blacklist of tokens until expiry
});

app.listen(PORT, () => {
  console.log(`JWT server is running on http://localhost:${PORT}`);
});
