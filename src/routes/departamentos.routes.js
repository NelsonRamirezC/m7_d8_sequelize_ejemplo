import { Router } from "express";
import {
    findAll,
    addDepartamentos,
} from "../controllers/departamentos.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get("/", findAll);

//RUTA CREAR NUEVOS USUARIOS
router.post("/", addDepartamentos);


export default router;
