import { z } from "zod";
export const promopickSchema = z.object({
    title: z
        .string({ message: "Title is required" })
        .min(2, { message: "Length must be at least 2 characters long" })
        .max(60, { message: "Length must be below 60 characters" }),
    description: z
        .string({ message: "Description is required" })
        .max(500, { message: "Description length must be below 500 characters" }),
    expire_at: z
        .string({ message: "Expire at is required." })
        .min(5, { message: "Please pick correct date" }),
    image: z.string().optional(),
});
