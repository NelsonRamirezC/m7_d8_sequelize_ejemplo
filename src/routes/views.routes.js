import { Router } from "express";
import {
    viewHomeController,
    viewUsuariosController,
    viewDetailsUsuarioController,
    viewDepartmentosCrudController,
    viewDepartmentosController,
    viewProyectosCrudController,
} from "../controllers/views.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get(["/", "/home"], viewHomeController);
router.get(["/usuarios", "/users"], viewUsuariosController);
router.get("/detalles/usuario/:id", viewDetailsUsuarioController);
router.get("/departamentos/crud", viewDepartmentosCrudController);
router.get("/departamentos", viewDepartmentosController);
router.get("/proyectos/crud", viewProyectosCrudController);

export default router;
