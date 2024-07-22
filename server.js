const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para servir el formulario HTML (opcional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar la suscripción
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // Configurar Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tu-correo@gmail.com',
      pass: 'tu-contraseña'
    }
  });

  const mailOptions = {
    from: 'tu-correo@gmail.com',
    to: 'destinatario@correo.com',
    subject: 'Nueva suscripción al boletín',
    text: `Nueva suscripción con el correo: ${email}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo.');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Te has suscrito exitosamente.');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
