import AWS from "aws-sdk";
import uniqid from "uniqid";
import sharp from "sharp";

const s3Obj = new AWS.S3( { 
    "accessKeyId": process.env.AWS_S3_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_S3_SECRET_ACCESS_KEY,
    "region": process.env.AWS_S3_REGION
} );

export class S3Lib {
    uploadToS3(file, directory) {
        const fileName = `${uniqid}.webp`,
            fileNameWithPath = `${fileName}/${fileName}`;

        return new Promise((resolve, reject) => {
            sharp( file.data )
            .webp( { quality: 50 })
            .toBuffer()
            .then( ( imgData ) => {
                const param = {
                    "Bucket": process.env.AWS_S3_BUCKET_NAME,
                    "Key": fileNameWithPath,
                    "Body": imgData,
                    "ACL": 'public-read'
                }

                s3Obj.upload( param, ( err, data ) => {
                    if( err ) {
                        reject(err);
                    }else {
                        resolve( fileName )
                    }
                });
            }).catch( ( err ) => {
                reject( err );
            });
        });
    } // end fun

    deleteFile( file ) {
        return new Promise((resolve, reject) => {
            const param = {
                "Bucket": process.env.AWS_S3_BUCKET_NAME,
                "Key": file
            }

            s3Obj.deleteObject( param, ( err, data ) => {
                if( err ) {
                    reject( err );
                }

                resolve( data );
            });
        });
    } // end fun
    
} // end class
