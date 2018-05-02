const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const pug = require("pug");

const app = express();

// Configuration settings on the app
app.set("view engine", "pug");
app.set("views", "templates");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/denmarkdb", err => {
  if (err) return console.log("Database connection error");
  return console.log("Database connected successfully");
});
require("./models");

// route Handler
require("./routes")(app);

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  return next(error);
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    status: err.status
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
