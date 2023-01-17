import httpStatus from "http-status-codes";
import * as authService from "../services/authService";

const login = (req, res, next ) => {
    console.log("req--", req.body );
    return authService.login( req, res, next ).then( ( data ) => {

        res.status( httpStatus.OK ).json( data );
    } ).catch( ( error ) => {
        next( error );
    });
    
};

const signup = (req, res, next ) => {
    console.log("req--", req.body );
    console.log("req files--", req.files );
    return authService.signup( req, res, next ).then( ( data ) => {

        res.status( httpStatus.OK ).json( data );
    }).catch( ( error ) => {
        next( error );
    });
};

const updateProfile = ( req, res, next ) => {
    return authService.updateProfile( req, res, next ).then( ( data ) => {

        res.status( httpStatus.OK ).json( data );
    } ).catch( (error) => {
        next( error );
    })
}

const authController = {
    login, signup, updateProfile
};

export default authController;