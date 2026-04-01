const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const colors = require("colors");
const client = require("prom-client");

const mongooseURI = require("./config/keys").mongoURI;

const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");

const app = express();
// Prometheus metrics
client.collectDefaultMetrics();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static (ONLY backend assets like images)
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ API Routes
app.use("/api/user", userRoutes);
app.use("/api/", shopRoutes);

// ✅ Health Check (important for k8s later)
app.get("/", (req, res) => {
  res.send("Node API is running");
});

// ✅ Prometheus Metrics Endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// ✅ Catch-all (VERY IMPORTANT — prevents frontend fallback)
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// DB + Server
mongoose
  .connect(mongooseURI)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log("Server running on port".magenta, colors.yellow(port));
    });
    console.log("\nConnected to".magenta, "E-MART".cyan, "database".magenta);
  })
  .catch(err => console.log("Error connecting to database".cyan, err));
