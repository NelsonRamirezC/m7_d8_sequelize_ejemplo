import express from "express";
import cors from "cors";
import morgan from "morgan";
import { create } from "express-handlebars";
import usuariosRoutes from "./routes/usuarios.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import departamentosRoutes from "./routes/departamentos.routes.js";
import fileUpload from "express-fileupload";

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

//CARPETAS PUBLICAS
app.use("/public", express.static(path.resolve(__dirname, "../public")));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());
app.use(morgan("tiny"));


//endpoints
app.use("/api/v1/usuarios", usuariosRoutes);
app.use("/api/v1/departamentos", departamentosRoutes);

//rutas de vista

app.use("/", viewsRoutes);


app.get("*", (req, res) => {
    res.render("notFound");
})

app.all("*", (req, res) => {
    res.status(404).send({code: 404, message: "El recurso al que intenta acceder no existe."});
})
export default app; 