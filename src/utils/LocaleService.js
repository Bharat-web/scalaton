export class LocaleService {
    constructor( i18provider ) {
        this.i18provider = i18provider;
    }

    translate( string ) {
        return this.i18provider.__( string );
    }
}