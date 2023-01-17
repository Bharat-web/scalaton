import express from "express";
import favicon from "serve-favicon";
import path from "path";
import bodyParser from "body-parser";
import adminRoutes from "./web/admin/routes";
import apiRoutesV1 from "./api/v1/auth/routes";
import * as buildErrors from "./middlewares/buildErrors";
import fileUpload from "express-fileupload";

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT;

app.set( "view engine", "ejs" );
app.set( "views", path.join(__dirname, "/views"));

app.use( favicon( path.join("./public/assets/favicon/", "favicon.ico") ) );
app.use( "/public", express.static( path.join(__dirname, "/../public")));

app.use( "/files", express.static( path.join( __dirname, "/../storage")) );

app.use( bodyParser.json( { "limit": "50mb" } ) );
app.use( bodyParser.urlencoded( { "limit": "50mb", "extended": false } ) );

app.use( fileUpload() );

app.use( "/", adminRoutes );
app.use( "/v1/", apiRoutesV1 );
app.use( buildErrors.notFound );

app.use( buildErrors.errorGenerator );

app.listen( port, ( req, res ) => {
    console.log(`App start on ${basepath}`);
});