const util = require("../util");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const PassportForm = mongoose.model("PassportForm");
const VisaForm = mongoose.model("VisaForm");
const User = mongoose.model("User");

module.exports = app => {
  app.get("/", (req, res, next) => {
    return res.render("passport");
  });

  app.get("/register", (req, res, next) => {
    return res.render("register");
  });

  app.post("/register", async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hash
      });
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/login", (req, res, next) => {
    return res.render("login");
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return util.error("No user exists with the provided email", next, 404);
      }
      const matching = await bcrypt.compare(password, user.password);
      if (matching) {
        return res.json(user);
      }
      return util.error("Incorrect password", next, 403);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/forms/passport", (req, res, next) => {
    return res.render("passportForm");
  });

  app.post("/forms/passport", async (req, res, next) => {
    try {
      const form = await PassportForm.create({ ...req.body });

      if (!form) {
        return util.error(
          "sorry, we are having problems processing your form, try again latter",
          next
        );
      }

      return res.json(form);
    } catch (error) {
      error.message = "Please fill all required fields";
      return next(error);
    }
  });

  app.get("/forms/visa", (req, res, next) => {
    return res.render("visaForm");
  });

  app.post("/forms/visa", async (req, res, next) => {
    try {
      const form = await VisaForm.create({ ...req.body });

      if (!form) {
        return util.error(
          "sorry, we are having problems processing your form, try again latter",
          next
        );
      }

      return res.json(form);
    } catch (error) {
      error.message = "Please fill all required fields";
      return next(error);
    }
  });
};
