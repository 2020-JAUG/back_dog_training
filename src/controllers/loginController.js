const userController = require("./usersControllers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Bienvenido a la Comunidad";


class LoginController {

    async validate( emailCheck, passwordCheck ) {

        let user = await userController.userEmail(emailCheck);

        if(user == null) {
          throw new Error("Wrong user or password");
        }

        let password = user.password;

        let verificar = await bcrypt.compare(passwordCheck,password);

        if(!verificar) {
            throw new Error("Wrong user or password");
        }

        if(!user.isActive) {
          throw new Error("The count is not active. Please check your mail");
        }

        let payload = {

          userId: user.id,
          createdAt: new Date,
          isAdmin: user.isAdmin
        };

          return jwt.sign(payload, secret);
    }
}

let loginController = new LoginController();
module.exports = loginController;