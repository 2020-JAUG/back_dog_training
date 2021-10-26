const nodemailer = require("nodemailer");

const user = "movieretro6@gmail.com";
const pass = "333movie333";

// const transport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: user,
//     pass: pass,
//   },
// });
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6298bf9fe37f28",
    pass: "3323381b61ca6a"
  }
});
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Dog Training Por favor, confirma tu cuenta de correo.",
    html: `<h1>Correo de Activación de cuenta</h1>
        <h2>Hola ${name},</h2>
        <p>Gracias por registrarte en Dog Training.
        Por favor, confirma tu email haciendo click en el siguiente enlace.</p>
        <a href=http://localhost:5000/users/confirm/${confirmationCode}> Activar cuenta.</a>
        </div>`,
  }).catch(err => console.log(err));
};

module.exports.sendConfirmationEmailNewClass = (name, email, roomName, roomDateStart) => {

  transport.sendMail({
    from: user,
    to: email,
    subject: "Movie Retro estas son tus peliculas alquiladas.",
    html: `<h1>Confirmacion clase reservada</h1>
        <h2>Hola ${name}</h2>
        <p>Te confirmamos la reserva de la clase de ${roomName} para el ${roomDateStart},
        te esperamos!.</p>
        </div>`,
  }).catch(err => console.log(err));
};