const router = require("express").Router();
const usersControllers = require("../controllers/usersControllers");
const authenticate = require("../middleware/authenticate");
const admin = require("../middleware/admin");
const multer = require("multer");
const path = require("path");

//Para indicarle donde guardar las imagenes
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../image"),
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
      "_user_doog_training_" +
        file.originalname
        // "." +
        // req.file.mimetype.split("/")[1]
    );
  },
});

//Asignamos el valor de la imagen a la const fileUpload
const fileUpload = multer({
  storage: diskstorage,
  // limits: {
  //   fileSize: 2000000, // 1000000 Bytes = 1 MB
  // },
}).single("image"); //El middleware recibe el nombre image que indicamos en la const formdata

router.post("/", async (req, res) => {
  try {
    const id = await usersControllers.createUser(req.body);
    const status = "success";
    res.json({ status, id });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//Subida de imágenes
router.post("/image", fileUpload, async (req, res) => {
  try {
    const image = req.file;
    const userId = req.file.originalname;
    res.json(await usersControllers.uploadFiles(image, userId));
    console.log(image, userId);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", admin, async (req, res) => {
  try {
    const id = req.params.id;
    res.json(await usersControllers.userId(id));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/", authenticate, async (req, res) => {
  try {
    const body = req.body;
    res.json(await usersControllers.modifyUser(body));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/updatepassword", authenticate, async (req, res) => {
  try {
    const body = req.body;
    res.json(await usersControllers.modifyPassword(body));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", admin, async (req, res) => {
  try {
    res.json(await usersControllers.findAllUsers());
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/bycp", admin, async (req, res) => {
  try {
    const body = req.body;
    res.json(await usersControllers.users_by_cp(body));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/removeuser", authenticate, async (req, res) => {
  try {
    const data = req.body;
    res.json(await usersControllers.deleteUser(data));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Mail confirmation
router.get("/confirm/:confirmationCode", async (req, res) => {
  try {
    token = req.params.confirmationCode;
    res.json(await usersControllers.updateActive(token));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
