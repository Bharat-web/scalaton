import path from "path";
import EmailTemplates from "email-templates";
import transport from "../utils/transport";

const templatePath = path.join( __dirname, "../emails" );

const emailConfig = new EmailTemplates( {
    "message": {
        "from": process.env.MAIL_USERNAME
    },
    "views": { "root": templatePath },
    "send": true,
    "preview": false,
    "transport": transport
});

export default emailConfig;