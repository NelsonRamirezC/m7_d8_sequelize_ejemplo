import express from "express";
import cors from "cors";
import morgan from "morgan";
import { create } from "express-handlebars";
import usuariosRoutes from "./routes/usuarios.routes.js";
import viewsRoutes from "./routes/views.routes.js";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//configuración handlebars
const hbs = create({
    partialsDir: [path.resolve(__dirname, "./views/partials/")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));


//endpoints


//rutas de vista
app.use("/api/v1/usuarios", usuariosRoutes);
app.use("/", viewsRoutes);



app.all("*", (req, res) => {
    res.status(404).send("<h1 style='text-align:center; padding-top: 10px;'>RUTA NO EXISTE.</h1>");
})
export default app; 