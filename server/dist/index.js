import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";
import Routes from "./routes/index.js";
import { appLimiter } from "./config/rateLimit.js";
import fileUpload from "express-fileupload";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 7000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log("DIRNAME HERE ", __dirname);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(express.static("public")); // declaring the public folder to server images
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(Routes);
app.get("/", async (req, res) => {
    const html = await ejs.renderFile(__dirname + "/views/emails/welcome.ejs", {
        name: "Susnata",
    });
    // await sendMail("waxed45743@segichen.com", "Test", html);
    await emailQueue.add(emailQueueName, {
        to: "waxed45743@segichen.com",
        subject: "Test!",
        body: html,
    });
    return res.json({ msg: "Email sent succesfully" });
    // return res.render("emails/welcome", { name: "Susnata" });
});
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});
