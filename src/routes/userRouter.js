const router = require("express").Router();
const usersControllers = require("../controllers/usersControllers");
const authenticate = require("../middleware/authenticate");
const admin = require("../middleware/admin");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const connection = require("../config/config.json");

//Para indicarle donde guardar las imagenes
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../image"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_user_doog_training_" + file.originalname);
  },
});
//Asignamos el valor de la imagen a la const fileUpload
const fileUpload = multer({
  storage: diskstorage,
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

// router.post("/image", fileUpload("image"), usersControllers.imageUpload);

router.post("/image", fileUpload, async (req, res) => {
    try {
        const image = req.file;
        const userId = req.file.originalname;
        res.json(await usersControllers.uploadFiles(image, userId));
        console.log('image-->', image, 'userId-->',userId);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
  // conncetion((err, conn) => {
  //     if(err) return res.status(500).send("Server error");

  //     //Guardamos el tipo de archivo
  //   //   const type = req.file.mimetype
  //   //   const name = req.file.originalname
  //     //Para leer el archivo con el módulo fs
  //     const data = fs.readFileSync(path.join(__dirname, '../image/' + req.file.filename));

  //     //Realizamos la query para insertar la img en la tabla
  //     query("INSERT INTO image set ?", [{image: data}], (err, rows) => {
  //         if(err) return res.status(500).send("Server error");

  //         res.send("Image saved.");
  //     });
  // });
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
