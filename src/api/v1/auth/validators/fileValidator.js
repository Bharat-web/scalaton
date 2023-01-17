import commonConstants from "../../../../constants/comman";
import { LocaleService } from "../../../../utils/LocaleService";
import i18n from "../../../../config/i18nconfig";
import imageSize from "image-size";

const fileSize = commonConstants.MAX_FILE_SIZE,
    minHeight = commonConstants.MIN_FILE_HEIGHT,
    minWidth = commonConstants.MIN_FILE_WIDTH,
    fileTypes = commonConstants.FILE_TYPES,
    localeService = new LocaleService( i18n );

export const fileValidator = ( fileObject ) => {
    console.log("fileObject", fileObject );
    if (Array.isArray( fileObject )) {
        let typeError = "",
            sizeError = "";
        
            for (let i = 0; i < fileObject.length; i++) {
                if ( !fileTypes.includes( fileObject[ i ].mimetype ) ) {
                    typeError += `${fileObject[ i ].name} is not a valid type \n`;
                }

                if ( fileObject[ i ].size > fileSize ) {
                    sizeError += `${fileObject[ i ].name} file size is greater than 2mb \n`;
                }
            }

            if ( typeError !== "" ) {
                throw typeError;
            }
    
            if ( sizeError !== "" ) {
                throw sizeError;
            }
    }else {
        if ( !fileTypes.includes( fileObject.mimetype ) ) {
            throw localeService.translate( "SUPPORTED_FILE_TYPES" );
        }

        if ( fileObject.size > fileSize ) {
            throw localeService.translate( "SUPPORTED_FILE_SIZE" );
        }

        const getImageLength = imageSize( fileObject.data );
        console.log("getImageLength-", getImageLength );
        if( getImageLength.width < minWidth && getImageLength.height < minHeight ) {
            throwError.message = localeService.translate( "SUPPORTED_FILE_LENGTH" );
            throw throwError;
        }
    }
}