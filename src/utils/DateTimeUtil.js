import moment from "moment-timezone";

class DateTimeUtil {
    static getCurrentTimeObjForDB() {
        const currentTime = new Date(),
            format = "YYYY-MM-DD HH:mm:ss";

        return moment(currentTime, format)
            .utc()
            .format(format);
    }

    static getCurrentYear() {
        const currentYear = new Date();
        const format = "YYYY";

        return moment( currentYear, format )
            .utc().format( format );
    }

    static getYearWithAddYear( add ) {
        const currentTime = new Date();
        const format = "YYYY";

        return moment( currentTime, format ).add( add, "y" )
            .utc().format( format );
    }
}

module.exports = DateTimeUtil;