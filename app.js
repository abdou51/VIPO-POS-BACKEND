const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "VIPO",
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// Define routes
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const roomRoutes = require("./routes/roomRoutes");
const tableRoutes = require("./routes/tableRoutes");

// Use Routes
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/rooms", roomRoutes);
app.use("/tables", tableRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status).json({ message: err });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
