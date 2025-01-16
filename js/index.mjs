import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.mjs";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT ?? "3500";
app.use(express.json());
app.use(cors());
app.use(routes);
app.get("/", (req, res) => {
    res.json({ msg: "base api route" });
});
app.get("*", (req, res) => {
    res
        .status(200)
        .send(`<h1 style="font-family: verdana;"> Welcome to Google Books Implementation API By Favitech</h1>`);
});
app.listen(PORT, () => {
    console.log(`App Instantiated At Port ${PORT}`);
});
