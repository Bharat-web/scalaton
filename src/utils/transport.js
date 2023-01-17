import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    "host": process.env.MAIL_HOST,
    "port": process.env.MAIL_PORT,
    "service": "gmail",
    "secure": false,
    "auth": {
        "user": process.env.MAIL_USERNAME,
        "pass": process.env.MAIL_PASSWORD
    },
    "logger": false,
    "debug": false,
    "tls": {
        "rejectUnauthorized": false
    }
});

export default transporter;