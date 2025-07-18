const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const userRoutes = require("../src/routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());

app.use("/api/v1/users", userRoutes);
connectDB();
module.exports = app;
