const { User } = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require("../config/nodemailerConfig");

const fs = require("fs");

const user = require("../models");
const Image = user.image;

class Users {

  async nameUser(name) {
    return User.findOne({
      where: { name },
    });
  }

  async userEmail(email) {
    let resultado = await User.findOne({
      where: { email },
    });
    return resultado;
  }

  async findAllUsers() {
    return User.findAll();
  }

  async createUser(user) {
    user.password = await bcrypt.hash(user.password, 10);

    // //Creamos una token random y lo enviamos por mail para activar la cuenta.
    // const characters =
    //   "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // let token = "";

    // for (let i = 0; i < 25; i++) {
    //   token += characters[Math.floor(Math.random() * characters.length)];
    // }

    // user = {
    //   name: user.name,
    //   lastName: user.lastName,
    //   password: user.password,
    //   city: user.city,
    //   email: user.email,
    //   token: token,
    // };

    return User.create(user);

    //Llamamos a la funcion para enviar el correo al usuario.
    // await nodemailer.sendConfirmationEmail(user.name, user.email, token);
  }

  //Para activar la cuenta de usuario. Recibiendo el token y id
  // async updateActive(token) {
  //   let user = await User.findOne({ where: { token } });
  //   let usuario = await User.update(
  //     //Datos que cambiamos
  //     {
  //       isActive: true,
  //     },
  //     { where: { id: user.id } }
  //   );
  //   let resultado =
  //     "La cuenta se ha activado correctamente. Ya puedes ingresar a la plataforma y conocer a la comunidad.";
  //   return resultado;
  // }

  async uploadFiles(image, userId) {
    // fs.renameSync(req.file.path, req.file.path + '.' +  req.file.originalname.split('/')[0] +  '.' + req.file.mimetype.split('/')[1]);
    // console.log(req.file);
    // res.send('Check Image');
    // Image.create({
    // data: fs.readFileSync(__dirname + "../image/" + req.file.filename),
    // });
    // return Image.create();
    // let usuario = await User.findByPk(userId);
    // if (userId === userId) {
    console.log(image, "userId-->", userId);
    return User.update({ image: image.image }, { where: { id: userId.id } });
    // } else {
    // throw new Error("Action canceled.");
    // }
  }

  async modifyUser(body) {
    //DAtos que cambiamos
    await User.update(
      {
        email: body.email,
        city: body.city,
      },
      //Donde
      { where: { id: body.userId } }
    );

    return User.findOne({
      where: { id: body.userId },
    });
  }

  async modifyPassword(body) {
    let user = await usersController.findUser(body.userId);

    let oldPassword = body.oldPassword;
    let password = user.password;

    let verify = await bcrypt.compare(oldPassword, password);

    if (!verify) {
      throw new Error("Wrong user or password");
    }

    let newPassword = await bcrypt.hashSync(body.newPassword, 10);

    let updatepassword = await User.update(
      { password: newPassword },
      //Donde...
      { where: { id: body.userId } }
    );

    return User.findOne({
      where: { id: body.userId },
    });
  }

  async findUser(id) {
    return User.findOne({ where: { id: id } });
  }

  async findByToken(token) {
    return User.findOne({ token: token });
  }

  async userId(id) {
    return User.findByPk(id);
  }

  async users_by_cp(body) {
    return User.findAll({ where: { cp: body.cp } });
  }

  async deleteUser(data) {
    return User.destroy({ where: { id: data.id } });
  }
}

let usersController = new Users();
module.exports = usersController;
