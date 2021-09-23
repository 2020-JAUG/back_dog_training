const router = require("express").Router();
const userController = require("../controllers/usersControllers");

const checkMail = async (req, res, next) => {
  const existsMail = await userController.userEmail(req.body.email);

  try {
    if (existsMail != null) {
      throw new Error("The email is already registered.");
    }
    return next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  };
};

module.exports = checkMail;
