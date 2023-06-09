"use strict";

const nodemailer = require("nodemailer");

let senderEmail = "";
let senderPassword = "";

// Configuración del transporte de correo electrónico
const transporter = nodemailer.createTransport({
    service: "SMTP", // especificar (Gmail, Outlook, etc.)
    auth: {
        user: senderEmail,
        pass: senderPassword,
    },
});

module.exports = {
    setSenderCredentials(email, password) {
        senderEmail = email;
        senderPassword = password;
    },
    async sendValidationEmail(validationCode, recipientEmail) {
        try {
            const mailOptions = {
                from: senderEmail,
                to: recipientEmail,
                subject: "Validación de correo electrónico",
                text: `Es necesario que valides tu correo electrónico con el código: ${validationCode}`,
            };

            const result = await transporter.sendMail(mailOptions);
            console.log("Correo electrónico enviado:", result);
        } catch (error) {
            console.error("Error al enviar el correo electrónico:", error);
        }
    },
};
