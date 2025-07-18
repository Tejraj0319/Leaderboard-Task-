const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("../src/routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://benevolent-gecko-7b17af.netlify.app",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());

app.use("/api/v1/users", userRoutes);
connectDB();
module.exports = app;
