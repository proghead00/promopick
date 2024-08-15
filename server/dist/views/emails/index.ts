import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app: Application = express();

const PORT = process.env.PORT || 7000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("DIRNAME HERE ", __dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.get("/", (req: Request, res: Response) => {
  return res.render("emails/welcome");
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
