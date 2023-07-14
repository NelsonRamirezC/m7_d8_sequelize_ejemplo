import { Router } from "express";
import {
    viewHomeController,
    viewUsuariosController,
    viewDetailsUsuarioController,
} from "../controllers/views.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get(["/", "/home"], viewHomeController);
router.get(["/usuarios", "/users"], viewUsuariosController);
router.get("/detalles/usuario/:id", viewDetailsUsuarioController);

export default router;
