import { Router } from "express";
import authController from "../controllers/authController"

const authRoutes = new Router();

authRoutes.get("/admin/login", authController.loginPage );
authRoutes.get("/admin/signup", authController.signupPage );

export default authRoutes;