import { Router } from "express";
import authRouters from "./authRoute";

const apiRoutesV1 = new Router();

apiRoutesV1.use( "/", authRouters );

export default apiRoutesV1;