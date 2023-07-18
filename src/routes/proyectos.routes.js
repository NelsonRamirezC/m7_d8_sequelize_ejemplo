import { Router } from "express";
import {
    findAll,
    addProyectos,
    vincularUsuarioProyecto,
    //vincularUsuarioDepto,
} from "../controllers/proyectos.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS proyectos
router.get("/", findAll);

//RUTA CREAR NUEVOS proyectos
router.post("/", addProyectos);

router.post("/vincular", vincularUsuarioProyecto);

export default router;
