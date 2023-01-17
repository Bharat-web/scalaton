import { Router } from "express";
import authRoutes from "./authRoute";

const adminRoutes = Router();

adminRoutes.use("/", authRoutes);

export default adminRoutes;

