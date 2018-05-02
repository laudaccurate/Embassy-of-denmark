const util = require("../util");
const mongoose = require("mongoose");
const PassportForm = mongoose.model("PassportForm");
const VisaForm = mongoose.model("VisaForm");

module.exports = app => {
  app.get("/", (req, res, next) => {
    return res.render("passport");
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
