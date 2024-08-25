import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
import VerifyRoutes from "./verifyRoutes.js";
import PasswordRoutes from "./passwordRoutes.js";
import PromoPick from "./promopickRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/auth", PasswordRoutes);
router.use("/", VerifyRoutes);

router.use("/api/promopick", PromoPick);
export default router;
