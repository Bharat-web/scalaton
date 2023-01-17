import i18n from "../config/i18nconfig";

exports.setLanguage = function (req, res, next) {
    if( req.headers["language"] != undefined && req.headers["language"] != "" ) {
        i18n.setLocale( req.headers["language"] );
    }

    next();
} 