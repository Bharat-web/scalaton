import AuthModel from "../models/AuthModel";
import httpStatus from "http-status-codes";
import DateTimeUtil from "../../../../utils/DateTimeUtil";
import FileUpload from "../../../../libraries/FileUpload";
import commonConstants from "../../../../constants/comman";
import { LocaleService } from "../../../../utils/LocaleService";
import i18n from "../../../../config/i18nconfig";
import password from "../../../../utils/password";
import { Security } from "../../../../libraries/Security";
import Email from "../../../../libraries/Email";

const AuthModelObj = new AuthModel(),
    fileUploadObj = new FileUpload(),
    emailObj = new Email(),
    localeService = new LocaleService( i18n );

const userFileDirectory = commonConstants.USER_FILE_DIRECTORY,
    userPlaceholder = `${basepath}/${commonConstants.PLACEHOLDER_IMAGE}`,
    userImgFolder = `${basepath}/${commonConstants.USER_IMAGE_FOLDER}`,
    emailLogo = `${basepath}/${commonConstants.EMAIL_LOGO}`;

/**
 * Signup
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const signup = async( req, res, next ) => {
    
    const ip = req.connection.remoteAddress;
    const requestData = req.body,
        currentDateTime = DateTimeUtil.getCurrentTimeObjForDB(),
        currentYear = DateTimeUtil.getCurrentYear(),
        nextYear = DateTimeUtil.getYearWithAddYear(1),
        year = `${currentYear}-${nextYear}`, 
        email = requestData.email,
        name = requestData.name,
        hashPassword = password.hashPassword( requestData.password ),
        insertCol = {
            "name": name,
            "email": email,
            "country_code": requestData.country_code,
            "dial_code": requestData.dial_code,
            "contact_number": requestData.user_contact,
            "password": hashPassword,
            "created_at": currentDateTime,
            "updated_at": currentDateTime
        },
        response = {
            "code": httpStatus.OK,
            "message": localeService.translate( "USER_SIGNUP" ),
            "data": {}
        };
        console.log("ip---", ip );
        
    if(req.files) {
        await fileUploadObj.uploadFile( req.files.image, userFileDirectory ).then( ( uploadFileData ) => {
            console.log("uploadFileData", uploadFileData );
            if (uploadFileData.name !== "") {
                insertCol.profile_picture = uploadFileData.name;
            }
        } ).catch( ( error ) => {
            console.log("error to upld file isss", error );
            throwError.message = localeService.translate( "FAIL_FILE_UPLOAD" );
            throw throwError;
        } );
    }
console.log("emailLogo", emailLogo );
    return AuthModelObj.createObj(insertCol).then( async( userData ) => {
        console.log("userData--=", userData );
        const mailDetails = {
            "template": "mailverify",
            "to": email,
            "subject": "Scalaton- Verify-Mail",
            "dynamicFields": {
                "link": `${basepath}/email-verify?email=${email}`,
                "name": name,
                "logo": emailLogo,
                "year": year
            }
        };

        const encodeId = Security.encodeId( userData[0] );
        const isMail = await emailObj.sendEmail( mailDetails );
         console.log("isMail", isMail);
        const tokenData = {
                "user_id": userData[0]
            },
            token = Security.getUserAuthToken( tokenData );
    
        console.log("token---", token );
        delete insertCol.password;
        delete insertCol.created_at;
        delete insertCol.updated_at;

        insertCol.user_id = encodeId;
        response.data.user = insertCol;
        response.data.user.token = token;

        return response;

    } ).catch( ( error ) => {
        throw error;
    });
};

/**
 * Login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const login = ( req, res, next ) => {
    const requestData = req.body,
        loginBy = requestData.login_by,
        where = {
            "email": loginBy
        },
        orWhere = {
            "contact_number": loginBy
        },
        fetchCol = [
            "user_id",
            "name",
            "email",
            "country_code",
            "dial_code",
            "contact_number",
            "password"
        ],
        qwery = `${fetchCol},
        ( CASE WHEN( profile_picture != "" ) THEN CONCAT("${userImgFolder}/", profile_picture) ELSE "${userPlaceholder}" END ) AS profile_picture`,
        response = { "code": httpStatus.OK, "message": localeService.translate( "SUCCESS" ), "data": {} };

    return AuthModelObj.checkUserLogin( where, orWhere, qwery ).then( async( loginData ) => {
        console.log("loginData---", loginData );
        if (!loginData) {
            throwError.message = localeService.translate( "USER_NOT_FAUND" );
            throw throwError;
        }

        const isMatch = await password.comparePassword( requestData.password, loginData.password );
        if ( !isMatch ) {
            throwError.message = localeService.translate( "USER_NOT_FAUND" );
            throw throwError;
        }

        const encodeId = Security.encodeId( loginData.user_id );
        const tokenData = {
                "user_id": loginData.user_id
            },
            token = Security.getUserAuthToken( tokenData );

        loginData.user_id = encodeId;
    
        delete loginData.password;
        console.log("token---", token );
        response.data.user = loginData;
        response.data.user.token = token;

        return response;
        
    }).catch( ( error ) => {
        throw error;
    });
}

/**
 * Signup
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const updateProfile = ( req, res, next ) => {
    
    const ip = req.connection.remoteAddress;
    const requestData = req.body,
        currentDateTime = DateTimeUtil.getCurrentTimeObjForDB(),
        userId = requestData.id,
        name = requestData.name,
        where = {
            "user_id": userId
        },
        updateCol = {
            "name": name,
            "updated_at": currentDateTime
        },
        fetchCols = [
            "name",
            "email",
            "country_code",
            "dial_code",
            "contact_number"
        ],
        qwery = `${fetchCols},
        ( CASE WHEN(profile_picture != "") THEN CONCAT("${userImgFolder}/", profile_picture) ELSE "${userPlaceholder}" END ) AS profile_picture`,
        response = {
            "code": httpStatus.OK,
            "message": localeService.translate( "USER_UPDATE" ),
            "data": {}
        };
        console.log("ip---", ip );

    return AuthModelObj.fetchFirst( where ).then( async( userData ) => {
        if ( !userData ) {
            throwError.message = localeService.translate( "NOT_FOUND" );
            throw throwError;
        }

        if(req.files) {
            await fileUploadObj.uploadFile( req.files.image, userFileDirectory ).then( async( uploadFileData ) => {
                console.log("uploadFileData", uploadFileData );
                if(uploadFileData.name !== "") {
                    updateCol.profile_picture = uploadFileData.name;
                }

                if ( userData.profile_picture != "" && userData.profile_picture != null ) {
                    await fileUploadObj.unlinkFile( `${userFileDirectory}/${userData.profile_picture}` );
                }
            } ).catch( ( error ) => {
                console.log("error to upld file isss", error );
                throwError.message = localeService.translate( "FAIL_FILE_UPLOAD" );
                throw throwError;
            } );
        }
        
        return AuthModelObj.updateObj( updateCol, where ).then( async( userUpdate ) => {
            console.log("userUpdate--=", userUpdate );
            return AuthModelObj.fetchSelectedFieldObject( qwery, where ).then( ( userData ) => {
                console.log("userData", userData );
                const encodeId = Security.encodeId( userId );
                const tokenData = {
                        "user_id": userId
                    },
                    token = Security.getUserAuthToken( tokenData );
            
                console.log("token---", token );

                userData.user_id = encodeId;
                response.data.user = userData;
                response.data.user.token = token;

                return response;

            }).catch( ( error ) => {
                throw error;
            });
        } ).catch( ( error ) => {
            throw error;
        });
    }).catch( ( error ) => {
        throw error;
    })
};

/**
 * Signup
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const getMyProfile = ( req, res, next ) => {
    
    const ip = req.connection.remoteAddress;
    const requestData = req.body,
        userId = requestData.id,
        where = {
            "user_id": userId
        },
        fetchCols = [
            "name",
            "email",
            "country_code",
            "dial_code",
            "contact_number"
        ],
        qwery = `${fetchCols},
        ( CASE WHEN(profile_picture != "") THEN CONCAT("${userImgFolder}/", profile_picture) ELSE "${userPlaceholder}" END ) AS profile_picture`,
        response = {
            "code": httpStatus.OK,
            "message": localeService.translate( "USER_UPDATE" ),
            "data": {}
        };
        console.log("ip---", ip );

    return AuthModelObj.fetchFirst( where ).then( async( userData ) => {
        if ( !userData ) {
            throwError.message = localeService.translate( "NOT_FOUND" );
            throw throwError;
        }
        
        return AuthModelObj.fetchSelectedFieldObject( qwery, where ).then( ( userData ) => {
            console.log("userData", userData );
            const encodeId = Security.encodeId( userId );
            const tokenData = {
                    "user_id": userId
                },
                token = Security.getUserAuthToken( tokenData );
        
            console.log("token---", token );

            userData.user_id = encodeId;
            response.data.user = userData;
            response.data.user.token = token;

            return response;

        }).catch( ( error ) => {
            throw error;
        });
    }).catch( ( error ) => {
        throw error;
    })
};