/*MICROSERVICES PATTERN:
The Microservices pattern means breaking down a big application into small, independent services that communicate (usually via HTTP or messaging).
Let’s implement a very simple microservices architecture in Node.js using Express to demonstrate:
1)User Service → manages users
2)Order Service → manages orders and calls User Service
3)API Gateway → single entry point for clients.

Each service runs independently (can be scaled separately).
Services communicate via API calls.
Clear separation of concerns (User management vs Order management).
DOCKER:
 we containerize these microservices with Docker Compose so you can run the whole system with a single command

*/
//user-service.js
const express = require("express");
const app = express();
app.use(express.json());

// Mock user database
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Get user by id
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.listen(4001, () => console.log("👤 User Service running on port 4001"));

//order-service.js
const express = require("express");
const axios = require("axios"); // to call User Service
const app = express();
app.use(express.json());

// Mock orders
const orders = [
  { id: 101, userId: 1, product: "Laptop" },
  { id: 102, userId: 2, product: "Phone" },
];

// Get all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Get order with user details
app.get("/orders/:id", async (req, res) => {
  const order = orders.find((o) => o.id == req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  try {
    const userResponse = await axios.get(
      `http://localhost:4001/users/${order.userId}`
    );
    res.json({ ...order, user: userResponse.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});

app.listen(4002, () => console.log("📦 Order Service running on port 4002"));

// api-gateway.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Route to User Service
app.use(
  "/users",
  createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true })
);

// Route to Order Service
app.use(
  "/orders",
  createProxyMiddleware({ target: "http://localhost:4002", changeOrigin: true })
);

app.listen(4000, () => console.log("🚪 API Gateway running on port 4000"));

//✅ How it Works
// start all services:
node user-service.js
node order-service.js
node api-gateway.js

/*
Client calls only the API Gateway (http://localhost:4000).

GET /users → forwarded to User Service.

GET /orders → forwarded to Order Service.

GET /orders/101 → Order Service calls User Service to enrich data.

IMPORTANCE:

Each service runs independently (can be scaled separately).
Services communicate via API calls.
Clear separation of concerns (User management vs Order management).
*/