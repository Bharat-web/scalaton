import dotenv from "dotenv";

dotenv.config();
console.log( "Database connect to", process.env.DB_NAME );
global.basepath = process.env.BASE_URL;
global.throwError = { "code": 400, "message": "Oops something gone wrong" };

// Default configuration for database connection
const connection = {
    "host": process.env.DB_HOST,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "charset": "utf8mb4",
    "collate": "utf8mb4_unicode_ci",
    "timezone": "EST",
    "dateStrings": true
};

export default {
    connection,
    "client": process.env.DB_CLIENT
    // "migrations": {
    //     "tableName": "migrations",
    //     "directory": "./migrations",
    //     "stub": "./stubs/migration.stub"
    // },
    // "seeds": {
    //     "directory": "./seeds",
    //     "stub": "./stubs/seed.stub"
    // }
};