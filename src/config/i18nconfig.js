import i18n from "i18n";
import path from "path";

i18n.configure( {
    "locales": ["en", "es"],
    "defaultLocale": "en",
    "queryParameter": "lang",
    "directory": path.join( __dirname, "/../locales" ),
    "api": {
        "__": "translate",
        "__N": "translateN"
    }
} );

export default i18n;