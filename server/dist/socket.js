import { votingQUeue, votingQueueName } from "./jobs/votingJob.js";
import { commentQueue, commentQueueName } from "./jobs/CommentJob.js";
export function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("USER CONNECTED -> ", socket.id);
        io.on("disconnect", () => {
            console.log("USER DISCONNECTED");
        });
        // Listen to any event
        socket.onAny(async (eventName, data) => {
            if (eventName.startsWith("promoting-")) {
                console.log("VOTING COUNT ->", data);
                await votingQUeue.add(votingQueueName, data);
                socket.broadcast.emit(`promoting-${data?.promoId}`, data);
            }
            else if (eventName.startsWith("promoting_comment-")) {
                await commentQueue.add(commentQueueName, data);
                socket.broadcast.emit(`promoting_comment-${data?.id}`, data);
            }
        });
    });
}
