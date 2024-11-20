const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const handlebars = require('handlebars');

class NotificationsService {
    sendEmail = async (infoMail) => {        
        const __dirname = path.dirname(__filename);
        const plantillaPath = path.join(__dirname, '../utils/handlebars/templateMail.hbs');
        const templateMail = fs.readFileSync(plantillaPath, 'utf-8');
        

        const template = handlebars.compile(templateMail);
        const data = infoMail;
        const mailHtml = template(data);
        
        const transporter = nodemailer.createTransport(
            {
            service: 'gmail',
            auth: {
                user: process.env.CORREO,
                pass: process.env.CLAVE
            }
        });
        
        const mailOptions = {
            to: infoMail.email,
            subject: "NOTIFICACION",
            html: mailHtml
        };

            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error al enviar el correo: ", error);
            } else {
              console.log("Correo enviado: ", info.response);
              res.send(true);
            }
          });


        try {
            const info = await transporter.sendMail(mailOptions);
            //console.log('Email sent: ', info);
            return { estado: true, mensaje: 'Correo electrónico enviado.' };
        } catch (error) {
            return { estado: false, mensaje: 'Correo electrónico no enviado.' };
        }
    }
}
module.exports = NotificationsService;