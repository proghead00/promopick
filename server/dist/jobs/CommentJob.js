import { Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import prisma from "../config/database.js";
export const commentQueueName = "votingQueue";
export const commentQueue = new Queue(commentQueueName, {
    connection: redisConnection,
    defaultJobOptions: {
        ...defaultQueueOptions,
        delay: 500,
    },
});
export const queueWorker = new Worker(commentQueueName, async (job) => {
    const data = job.data;
    await prisma.promoComments.create({
        data: {
            comment: data?.comment,
            promo_id: Number(data?.id),
        },
    });
}, {
    connection: redisConnection,
});
