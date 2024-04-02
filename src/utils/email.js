import { createTransport } from 'nodemailer';
import { email_user, email_app_password, email_service } from '../../config/config.js';


const mailTransporter = createTransport({
    service: email_service,
    auth: {
        user: email_user,
        pass: email_app_password,
    },
});

const mailSender = ({ to, subject, text }) => {
    const details = {
        from: email_user,
        to: to,
        subject: subject,
        // html: html,
        text: text
    };
    return mailTransporter.sendMail(details);
};

export default mailSender;