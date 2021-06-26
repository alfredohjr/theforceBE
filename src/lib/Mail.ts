// import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

import * as nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

interface Auth {
    user: string;
    pass: string;
}

interface MailConfig {
    host: string;
    port: number;
    auth: Auth;
}

const transporter = nodemailer.createTransport(mailConfig);

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

export default transporter;