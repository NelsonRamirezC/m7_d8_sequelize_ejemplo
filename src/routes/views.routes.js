import { Router } from "express";
import {
    viewHomeController,
    viewUsuariosController,
} from "../controllers/views.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get(["/", "/home"], viewHomeController);
router.get(["/usuarios", "/users"], viewUsuariosController);

export default router;
