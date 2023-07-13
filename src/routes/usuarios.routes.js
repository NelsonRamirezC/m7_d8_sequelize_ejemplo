import { Router } from "express";
import { findAll, addUsuario, findById } from "../controllers/usuarios.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get("/", findAll);

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get("/:id", findById);

//RUTA CREAR NUEVOS USUARIOS
router.post("/", addUsuario);

//RUTA ELIMINAR USUARIOS

//RUTA MODIFICAR USUARIOS

export default router;
