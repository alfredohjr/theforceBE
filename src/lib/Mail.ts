import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

interface Auth {
    user: string;
    pass: string;
}

interface MailConfig {
    host: string;
    port: number;
    auth: Auth;
}

export default nodemailer.createTransport(mailConfig);