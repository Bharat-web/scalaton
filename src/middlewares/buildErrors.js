import httpStatus from "http-status-codes";
import logger from "../utils/logger";

export const notFound = ( req, res ) => {
    console.log("not found req", req.url );
    res.status( httpStatus.NOT_FOUND ).json( { "code": httpStatus.NOT_FOUND, "message": "Page Not Found" } );
};

export const errorGenerator = async( err, req, res, next ) => {
    console.log("err in errorGenerator-", err);
    logger.error( err );
    const errorObject = await new Promise((resolve, reject) => {
        if( err.isJoi ) {
            resolve({
                "code": httpStatus.BAD_REQUEST,
                "message": err.details[ 0 ].message.replace( /"/g, "" )
            });
        }else if (err.code == 400) {
            resolve({
                "code": httpStatus.BAD_REQUEST,
                "message": err.message
            });
        }else {
            resolve({
                "code": httpStatus.INTERNAL_SERVER_ERROR,
                "message": "Something went wrong!"
            });
        }
    });

    res.status( errorObject.code ).json( errorObject );
};