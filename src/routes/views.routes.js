import { Router } from "express";
import {
    viewHomeController,
    viewUsuariosController,
    viewDetailsUsuarioController,
    viewDepartmentosCrudController,
    viewDepartmentosController,
} from "../controllers/views.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get(["/", "/home"], viewHomeController);
router.get(["/usuarios", "/users"], viewUsuariosController);
router.get("/detalles/usuario/:id", viewDetailsUsuarioController);
router.get("/departamentos/crud", viewDepartmentosCrudController);
router.get("/departamentos", viewDepartmentosController);

export default router;
