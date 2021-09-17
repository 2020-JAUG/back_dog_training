const router = require("express").Router();
const postControllers = require("../controllers/postControllers");
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
    cb(null, Date.now() + "_user_doog_training_" + file.originalname.split("/")[0] + "." + file.mimetype.split('/')[1]);
  },
});
//Asignamos el valor de la imagen a la const fileUpload
const fileUpload = multer({
  storage: diskstorage,
}).single("image"); //El middleware recibe el nombre image que indicamos en la const formdata


router.post("/", authenticate, fileUpload, async(req, res) => {
    try {
        const id = req.body;
        const image = req.file;
        // const status = "success";
        // res.json({ status, id });
        res.json(await postControllers.makePost(id, image))
        console.log('id->', id);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put("/deletepost", authenticate,  async(req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req.body.userId;
        res.json(await postControllers.removePost(postId, userId))
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get("/",  async(req, res) => {
    try {
        res.json(await postControllers.findAllPost());
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

//Para traer los posts de un usuario por id
router.post("/userpost",  async(req, res) => {
    try {
        const userId = req.body.id;
        res.json(await postControllers.findPostByUserId(userId));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.put("/updatepost", authenticate, async(req, res) => {
    try {
        const body = req.body;
        res.json(await postControllers.modifyPost(body));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;