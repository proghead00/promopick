import { Router } from "express";
import { ZodError } from "zod";
import { formatError, imageValidator, removeImage, uploadFile, } from "../helper.js";
import { promopickSchema } from "../validation/promopickValidations.js";
import prisma from "../config/database.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const payload = promopickSchema.parse(body);
        // files exist check
        if (req.files?.image) {
            const image = req.files?.image;
            const validationMsg = imageValidator(image.size, image.mimetype);
            if (validationMsg) {
                res.status(422).json({ errors: { image: validationMsg } });
            }
            payload.image = await uploadFile(image);
        }
        else {
            res.status(422).json({ errors: { image: "Image is required" } });
        }
        await prisma.promopick.create({
            data: {
                ...payload,
                user_id: req.user?.id,
                expire_at: new Date(payload.expire_at),
                image: payload.image,
            },
        });
        return res.json({ message: "Promo created succesfully!" });
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
// get all promos
router.get("/", async (req, res) => {
    try {
        const promo = await prisma.promopick.findMany({
            where: { user_id: req.user?.id },
            orderBy: {
                id: "desc",
            },
        });
        return res.json({ message: "Promo fetched succesfully!", data: promo });
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
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const promo = await prisma.promopick.findUnique({
            where: { id: Number(id) },
            //   select: {
            //     id: true,
            //     title: true,
            //   }, // can give speciic fields ONLY to be returned
        });
        return res.json({ message: "Promo fetched succesfully!", data: promo });
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
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = promopickSchema.parse(body);
        // files exist: check
        if (req.files?.image) {
            const image = req.files?.image;
            const validationMsg = imageValidator(image.size, image.mimetype);
            if (validationMsg) {
                res.status(422).json({ errors: { image: validationMsg } });
            }
            // get old img name
            const promo = await prisma.promopick.findUnique({
                select: {
                    id: true,
                    image: true,
                },
                where: {
                    id: Number(id),
                },
            });
            if (promo) {
                removeImage(promo?.image);
            }
            payload.image = await uploadFile(image);
        }
        await prisma.promopick.update({
            where: {
                id: Number(id),
            },
            data: { ...payload, expire_at: new Date(payload.expire_at) },
        });
        return res.json({ message: "Promo updated succesfully!" });
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
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // get old img name
        const promo = await prisma.promopick.findUnique({
            select: {
                id: true,
                image: true,
            },
            where: {
                id: Number(id),
            },
        });
        if (promo) {
            removeImage(promo?.image);
        }
        await prisma.promopick.findUnique({
            where: {
                id: Number(id),
            },
        });
        // if (promo) {
        //   removeImage(promo?.image);
        // }
        await prisma.promopick.delete({
            where: {
                id: Number(id),
            },
        });
        return res.json({ message: "Promo deleted succesfully!" });
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
// Promo Items
router.post("/items", async (req, res) => { });
export default router;
