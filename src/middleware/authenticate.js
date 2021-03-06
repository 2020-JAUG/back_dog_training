const jwt = require("jsonwebtoken");
const secret = "Final Project";

const authenticate = (req, res, next) => {
    try {

        if( !req.headers.authorization ) {
            return new Error ("You don't have token.");
        }

        //Aqui obtenemos el token
        let token = req.headers.authorization.split(" ")[1];
        let auth = jwt.verify(token, secret);

        if( auth.userId != req.body.userId )  {

            throw new Error("You don't have authorization.");
        } else {
            return next();
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
module.exports = authenticate;