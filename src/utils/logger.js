import winston from "winston";
require("winston-daily-rotate-file");

// const logLevels = {
//     fatal: 0,
//     error: 1,
//     warn: 2,
//     info: 3,
//     debug: 4,
//     trace: 5,
//   };

const LOG_DIR = process.env.LOG_DIR || "logs",
    LOG_LEVEL = process.env.LOG_LEVEL || "info",
    logger = winston.createLogger({
        "transports": [
            new winston.transports.Console( {
                "format": winston.format.combine( winston.format.colorize(), winston.format.simple() ),
                "level": "info",
                "defaultMeta": { service: "user-service" }
            } ),
            new winston.transports.DailyRotateFile( {
                "format": winston.format.combine( winston.format.timestamp(), winston.format.json() ),
                "maxFiles": "14d",
                "level": LOG_LEVEL,
                "dirname": LOG_DIR,
                "datePattern": "YYYY-MM-DD-HH",
                "filename": "%DATE%-debug.log"
            } )
        ]
    });

export default logger;
