import express from "express";
import favicon from "serve-favicon";
import path from "path";
import bodyParser from "body-parser";
import adminRoutes from "./web/admin/routes";
import apiRoutesV1 from "./api/v1/auth/routes";
import * as buildErrors from "./middlewares/buildErrors";
import fileUpload from "express-fileupload";
import pdfParse from "pdf-parse";
import PDFDocument from 'pdfkit';
import fs from "fs";

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

/** Replace string in pdf file */
// const getPDF = async (file) => {
// let readFileSync = fs.readFileSync(file)
//   try {
//     let pdfExtract = await pdfParse(readFileSync)
//     const contents = pdfExtract.text;
//     // console.log('File content: ', contents );
//     const updateText = contents.replace(/Sunny/gi, 'Shree');
//     // console.log('Total pages: ', pdfExtract.numpages)
//     // console.log('All content: ', pdfExtract.info)
//     let pdfDoc = new PDFDocument;
//     pdfDoc.pipe(fs.createWriteStream(path.join( __dirname, "/../uploads/","new.pdf")));
//     pdfDoc.text(updateText);
//     pdfDoc.end();
//   } catch (error) {
//     throw new Error(error)
//   }

// }

// const pdfRead = path.join( __dirname, "/../uploads/","you.pdf");

// getPDF(pdfRead);

/***************************************************************************************** */

/** Replace string in txt file */
// const filePath = path.join( __dirname, "/../uploads/","my.txt");
// // Read file into a string
// fs.readFile(filePath, 'utf-8', (err, contents) => {
//     if (err) {
//       console.log("error in readFile", err);
//       return false;
//     }
//     console.log("contents-", contents );
//     // Replace string occurrences
//     const updateText = contents.replace(/Sunny/gi, 'Shree')
  
//     // Write back to file
//     fs.writeFile(filePath, updateText, 'utf-8', err2 => {
//       if (err2) {
//         console.log("error in writeFile222", err2);
//       }else {
//         console.log("congrats!!!!!!!!!1");
//       }
//     })
// })

app.listen( port, ( req, res ) => {
    console.log(`App start on ${basepath}`);
});
