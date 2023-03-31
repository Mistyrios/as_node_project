'use strict';

const Nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailerService extends Service {
    
    async sendAMail(to, subject, text) {
        const transporter = Nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const message = {
            from: process.env.MAIL_FROM_ADDRESS,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(message);
        console.log(`Message sent: ${info.messageId}`);
        console.log(`Preview URL: ${Nodemailer.getTestMessageUrl(info)}`);
    }
    async sendWelcomeEmail(to, username) {
        await this.sendAMail(to, `Bienvenue ${username}`, `Bienvenue ${username} sur notre application de gestion de films`);
    }

    async sendNewMovieEmail(title) {
        const { userService } = this.server.services();
        const users = await userService.getAll();
        const mailList = users.map((user) => user.mail);
        await this.sendAMail(mailList, `Nouveau film ajouté : ${title}`, `Nous avons ajouté le film ${title} à notre catalogue`);
    }

    async sendUpdateMovieEmail(title, movieId) {
        const { favoriteService } = this.server.services();
        const favorites = await favoriteService.query().where({ movieId });
        const mailList = favorites.map((favorite) => favorite.user.mail);
        await this.sendAMail(mailList, `Modification d'un film : ${title}`, `Le film ${title} a été modifié`);
    }
};
