import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { sendMail } from "./config/mail.js";
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";

const app: Application = express();

const PORT = process.env.PORT || 7000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("DIRNAME HERE ", __dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.get("/", async (req: Request, res: Response) => {
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
