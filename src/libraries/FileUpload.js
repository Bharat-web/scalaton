import uniqid from "uniqid";
import fs from "fs";

export default class FileUpload {

    uploadFile( file, directory ) {
        return new Promise((resolve, reject) => {
            console.log("file", file);
            if ( file != "" && file != null ) {
                const ext = file.name.split( "." ).pop(),
                    fileName = `${uniqid()}.${ext}`,
                    fileNameWithPath = `${directory}/${fileName}`;
                    console.log("fileNameWithPath", fileNameWithPath);
                if ( !fs.existsSync( directory ) ) {
                    fs.mkdirSync( directory, { "recursive": true } );
                }

                file.mv( fileNameWithPath, ( err ) => {
                    console.log("err in file up", err );
                    if (err) {
                        reject();
                    }
                
                    resolve( { "name": fileName, "path": fileNameWithPath } );
                } );
            }else {
                resolve( { "name": "" } );
            }
        });
    } // end fun

    unlinkFile( fileWithDirectory ) {

        fs.unlink( fileWithDirectory, ( err ) => {
            return false;
        });

        return true;
    } // end fun


} // end class