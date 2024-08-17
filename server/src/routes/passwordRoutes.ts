import { Router, Request, Response } from "express";
import prisma from "../config/database.js";
import { authLimiter } from "../config/rateLimit.js";
import { checkDateHourDiff, formatError, renderEmailEjs } from "../helper.js";
import { ZodError } from "zod";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validation/authValidation.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";

const router = Router();

router.post(
  "/forgot-password",
  authLimiter,
  async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const payload = forgotPasswordSchema.parse(body);

      let user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        return res.status(422).json({
          message: "Invalid data",
          errors: {
            email: "No user found with this email",
          },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const token = await bcrypt.hash(uuidv4(), salt);

      await prisma.user.update({
        data: {
          password_reset_token: token,
          token_send_at: new Date().toISOString(),
        },
        where: {
          email: payload.email,
        },
      });

      const url = `${process.env.CLIENT_URL}/reset-password?email=${payload.email}&token=${token}`;

      const html = await renderEmailEjs("forgot-password", { url: url });
      await emailQueue.add(emailQueueName, {
        to: payload.email,
        subject: "Reset Password",
        body: html,
      });

      return res.json({ message: "Please check your email inbox" });
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = formatError(err);
        return res.status(422).json({ message: "Invalid data", errors });
      }

      return res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

router.post(
  "/reset-password",
  authLimiter,

  async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const payload = resetPasswordSchema.parse(body);

      let user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        return res.status(422).json({
          message: "Invalid data",
          errors: {
            email: "Invalid URL",
          },
        });
      }

      // match token
      if (user.password_reset_token !== payload.token) {
        return res.status(422).json({
          message: "Invalid data",
          errors: {
            email: "Invalid link",
          },
        });
      }

      // 2hrs link validity checks
      const hoursDiff = checkDateHourDiff(user.token_send_at!);
      if (hoursDiff > 2) {
        return res.status(422).json({
          message: "Invalid data",
          errors: {
            email: "Password link has expired",
          },
        });
      }
      // update password
      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(payload.password, salt);

      await prisma.user.update({
        data: {
          password: newPass,
          password_reset_token: null,
          token_send_at: null,
        },
        where: { email: payload.email },
      });
      return res.json({ message: "Password has been reset. Login again!" });
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = formatError(err);
        return res.status(422).json({ message: "Invalid data", errors });
      }

      return res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);
export default router;
