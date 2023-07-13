import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));


app.all("*", (req, res) => {
    res.status(404).send("<h1 style='text-align:center; padding-top: 10px;'>RUTA NO EXISTE.</h1>");
})
export default app; 