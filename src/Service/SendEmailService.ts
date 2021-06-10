import * as nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

interface Request {
    to: string;
    subject: string;
    template: string;
    context: object;
}

class SendEmailService {
    public async execute({to, subject, template, context}: Request): Promise<void> {
        const mailOptions = {
            from: 'alfredo@test.com.br',
            to,
            subject,
            template,
            context
        }
        
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        const viewPath = resolve(__dirname,'..','views','emails');

        transporter.use('compile',nodemailerhbs({
          viewEngine: exphbs.create({
            layoutsDir: resolve(viewPath, 'layouts'),
            partialsDir: resolve(viewPath, 'partials'),
            defaultLayout: 'default',
            extname: '.hbs',
          }),
          viewPath,
          extName: '.hbs',
        })
        )

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        });
    }
}

export default SendEmailService;