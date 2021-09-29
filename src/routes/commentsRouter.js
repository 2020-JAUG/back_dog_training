const router = require("express").Router();
const commentsControllers = require("../controllers/commentsControllers");
const authenticate = require("../middleware/authenticate");
const admin = require("../middleware/admin");

router.post("/", async(req, res) => {
    try {
        const id = await commentsControllers.makeComment(req.body);
        const status = "success";
        res.json({ status, id });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/deletecomment", authenticate, async(req, res) => {
    try {
        const data = req.body;
        res.json(await commentsControllers.removeComment(data))
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

//Find all comments by postId
router.post("/bypostid",  async(req, res) => {
    try {
        const postId = req.body.id;
        res.json(await commentsControllers.comments_by_postId(postId));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;