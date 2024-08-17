import { Router } from "express";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";
const router = Router();
router.post("/register", authLimiter, async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (user) {
            return res.status(422).json({
                errors: {
                    email: "Email is already taken",
                },
            });
        }
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        const token = await bcrypt.hash(uuidv4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
        const emailBody = await renderEmailEjs("email-verify", {
            name: payload.name,
            url: url,
        });
        // send email
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Promopick: Email verification",
            body: emailBody,
        });
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token,
            },
        });
        return res.json({ message: "Please check your email inbox" });
    }
    catch (err) {
        if (err instanceof ZodError) {
            const errors = formatError(err);
            return res.status(422).json({ message: "Invalid data", errors });
        }
        return res
            .status(500)
            .json({ message: "Something went wrong, please try again" });
    }
});
router.post("/login", authLimiter, async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user) {
            return res.status(422).json({
                errors: {
                    email: "No user found with this email",
                },
            });
        }
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            return res.status(422).json({
                errors: {
                    email: "Invalid credentials",
                },
            });
        }
        // JWT payload
        let jwtPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
            expiresIn: "365d",
        });
        return res.json({
            message: "Logged in succesfully",
            data: { ...jwtPayload, token: `Bearer ${token}` },
        });
    }
    catch (err) {
        if (err instanceof ZodError) {
            const errors = formatError(err);
            return res.status(422).json({ message: "Invalid data", errors });
        }
        return res
            .status(500)
            .json({ message: "Something went wrong, please try again" });
    }
});
router.post("/check-credentials", authLimiter, async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user) {
            return res.status(422).json({
                errors: {
                    email: "No user found with this email",
                },
            });
        }
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            return res.status(422).json({
                errors: {
                    email: "Invalid credentials",
                },
            });
        }
        return res.json({
            message: "Logged in succesfully",
            data: {},
        });
    }
    catch (err) {
        if (err instanceof ZodError) {
            const errors = formatError(err);
            return res.status(422).json({ message: "Invalid data", errors });
        }
        return res
            .status(500)
            .json({ message: "Something went wrong, please try again" });
    }
});
router.get("/user", authMiddleware, async (req, res) => {
    const user = req.user;
    return res.json({ data: user });
});
export default router;
