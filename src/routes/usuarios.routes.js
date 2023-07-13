import { Router } from "express";
import {
    findAll,
    addUsuario,
    findById,
    findByEmail,
    deleteUsuario,
    updateUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get("/", findAll);

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get("/:id", findById);

//RUTA CONSULTAR USUARIOS POR EMAIL
router.get("/email/:email", findByEmail);

//RUTA CREAR NUEVOS USUARIOS
router.post("/", addUsuario);

//RUTA ELIMINAR USUARIOS
router.delete("/:id", deleteUsuario);

//RUTA MODIFICAR USUARIOS
router.put("/:id", updateUsuario);

export default router;
