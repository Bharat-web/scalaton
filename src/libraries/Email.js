import emailConfig from "../config/emailConfig";

export default class Email {
    
    sendEmail( mailDetails ) {
    
        return emailConfig.send( {
            "template": mailDetails.template,
            "message": {
                "to": mailDetails.to,
                "subject": mailDetails.subject
            },
            "locals": mailDetails.dynamicFields
        }).then( ( info ) => {
            
            return true;
        }).catch( ( err ) => {
            
            return false;
        });
    }
}