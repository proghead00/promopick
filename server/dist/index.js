import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 7000;
app.get("/", (req, res) => {
    return res.send("Running");
});
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});
