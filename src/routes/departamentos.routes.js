import { Router } from "express";
import {
    findAll,
    addDepartamentos,
    vincularUsuarioDepto,
} from "../controllers/departamentos.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get("/", findAll);

//RUTA CREAR NUEVOS USUARIOS
router.post("/", addDepartamentos);

router.post("/vincular", vincularUsuarioDepto);


export default router;
