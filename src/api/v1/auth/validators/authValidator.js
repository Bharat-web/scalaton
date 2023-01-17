import Joi from "joi";
import validate from "../../../../utils/validate";
import { fileValidator } from "../validators/fileValidator";
import { LocaleService } from "../../../../utils/LocaleService";
import i18n from "../../../../config/i18nconfig";
import commonConstants from "../../../../constants/comman";

const passRegex = new RegExp( commonConstants.PASS_REGEX ),
    localeService = new LocaleService( i18n );

const LOGIN_SCHEMA = {
        "login_by": Joi.string()
            .required()
            .error( () => {
                return {
                    "message": "Email/Contact Number is required."
                };
            } ),
        "password": Joi.string()
            .required()
            .error( () => {
                return {
                    "message": "password is required."
                };
            } )
    },
    UPDATE_PROFILE_SCHEMA = {
        "id": Joi.number()
            .required()
            .error( () => {
                return {
                    "message": "id is required."
                };
            } ),
        "image": Joi.allow(''),
        "name": Joi.string()
            .label( "Name" )
            .max( 50 )
            .min( 2 )
            .required()
            .error( () => {
                return {
                    "message": localeService.translate("REQ_NAME")
                };
            } )
    },
    SIGNUP_SCHEMA = {
        "image": Joi.allow(''),
        "name": Joi.string()
            .label( "Name" )
            .max( 50 )
            .min( 2 )
            .required()
            .error( () => {
                return {
                    "message": localeService.translate("REQ_NAME")
                };
            } ),
        "password": Joi.string()
            .label( "Password" )
            .min( 8 )
            .max( 150 )
            .regex( passRegex )
            .required()
            .error( ( errors ) => {
                errors.forEach( ( err ) => {
                    switch ( err.type ) {
                        case "string.regex.base":
                            err.message = localeService.translate( "PASSWORD_PATTERN" );
                            break;
                        default:
                            break;
                    }
                } );

                return errors;
            } ),
        "email": Joi.string()
            .label( "Email" )
            .max( 50 )
            .min( 4 )
            .email()
            .required(),
        "user_contact": Joi.string()
            .min( 5 )
            .required()
            .label( "CONTACT" ),
        "dial_code" : Joi.string()
            .min( 1 )
            .required()
            .label( "Dial code" ),
        "country_code": Joi.string()
            .min( 1 )
            .required()
            .label( "COUNTRY CODE" )
    };

const loginValidator = (req, res, next ) => {
    return validate( req.body, LOGIN_SCHEMA ).then( () => next() ).catch( ( error ) => {
        
        next( error );
    });
};

const signupValidator = (req, res, next ) => {
    return validate( req.body, SIGNUP_SCHEMA ).then( () => next() ).catch( ( error ) => {
        
        next( error );
    });
};

const updatProfileValidator = (req, res, next ) => {
    return validate( req.body, UPDATE_PROFILE_SCHEMA ).then( () => next() ).catch( ( error ) => {
        
        next( error );
    });
};

const profileImageValidator = ( req, res, next ) => {
    console.log(111, req.files);
    if( req.files && req.files.image ) {
        fileValidator( req.files.image );
    }

    next();
}

export {
    loginValidator,
    profileImageValidator,
    signupValidator,
    updatProfileValidator
}