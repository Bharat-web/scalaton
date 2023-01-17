import jwt from "jsonwebtoken";
import commonConstants from "../constants/comman";
import authModel from "../api/v1/auth/models/AuthModel";
import { LocaleService } from "../utils/LocaleService";
import i18n from "../config/i18nconfig";
import Hashids from "hashids";

const authModelObj = new authModel(),
    hashidObj = new Hashids("My scalaton", 6),
    localeService = new LocaleService( i18n );
    
export class Security {

    static getUserAuthToken( user ) {
        const jwtToken = jwt.sign( user, process.env.JWT_SECRET, { "expiresIn": commonConstants.JWT_EXPIRE_TIME });

        return jwtToken;
    }

    static verifyJWT(req, res, next) {
        let token = req.headers['authorization'];
        console.log( "token in verify", token );

        // token = token.replace("JWT", "").trim();

        try {
            const decoded = jwt.verify( token, process.env.JWT_SECRET );
            console.log("decoded---", decoded )
            req.body.id = decoded.user_id;

            const where = {
                "user_id": decoded.user_id
            };

            authModelObj.fetchFirst( where ).then( (userData) => {
                if (!userData) {
                    throwError.message = localeService.translate( "NOT_FOUND" );
                    throw throwError;
                }else {
                    return next();
                }
            })

        } catch (error) {
            throwError.message = localeService.translate( "EXPIRE" );
            throw throwError;
        }
    }

    static encodeId( id ) {
        console.log("hashidObj", hashidObj);
        return hashidObj.encode( id );
    }

    static decodeId( encodedID ) {
        return hashidObj.decode( encodedID )[ 0 ];
    }
}