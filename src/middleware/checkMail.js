const router = require("express").Router();
const userController = require("../controllers/usersControllers");

const checkMail = async (req, res, next) => {
  const existsMail = await userController.userEmail(req.body.email);

  try {
    if (existsMail != null) {
      throw new Error("The email is already registered.");
    }
    return next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  };
};

module.exports = checkMail;
