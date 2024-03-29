import Usuario from "../models/Usuario.models.js";
import Direccion from "../models/Direccion.models.js";
import sequelize from "../database/database.js";
import { QueryTypes } from"sequelize";

export const findAll = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll({
            order: [["id", "ASC"]],
            include: [{
                    model: Direccion,
                    as: "direccion",
                }
            ],
            attributes: ["id", "nombre", "apellido", "email", "imagen"],
        });
        res.json({ code: 200, message: "ok", data: usuarios });
    } catch (error) {
        console.log("Error findAll usuarios", error);
        res.status(500).json({
            code: 500,
            message: "Error al obtener los datos de usuarios.",
        });
    }
};

export const findById = async (req, res) => {
    let id = Number(req.params.id);
    try {
        if (isNaN(id)) {
            return res
                .status(400)
                .json({ code: 400, message: "Debe enviar un id númerico." });
        }
        let usuario = await Usuario.findByPk(id, {
            attributes: ["id", "nombre", "apellido", "email", "imagen"],
            include: [
                {
                    model: Direccion,
                    as: "direccion",
                    attributes: { exclude: ["usuarioId"] },
                },
            ],
        });
        if (!usuario) {
            return res.status(400).json({
                code: 400,
                message: "No existe un usuario registrado con el id: " + id,
            });
        }

        res.json({ code: 200, message: "ok", data: usuario });
    } catch (error) {
        console.log("Error findById usuarios", error);
        res.status(500).json({
            code: 500,
            message: "Error al obtener el usuario con id: " + id,
        });
    }
};

export const findByEmail = async (req, res) => {
    let email = req.params.email;
    try {
        let usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({
                code: 400,
                message:
                    "No existe un usuario registrado con el email: " + email,
            });
        }
        res.json({ code: 200, message: "ok", data: usuario });
    } catch (error) {
        console.log("Error findByEmail usuarios", error);
        res.status(500).json({
            code: 500,
            message:
                "Error al obtener los datos del usuario con email: ." + email,
        });
    }
};

export const addUsuario = async (req, res) => {
    try {
        let { nombre, apellido, email, imagen, direccion, comuna, ciudad } = req.body;

        let nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            email,
            imagen,
            direccion: {
                direccion,
                comuna,
                ciudad,
            },
        }, {
            include: {
                model: Direccion,
                as: "direccion"
            }
        });


        res.status(201).json({
            code: 201,
            message: "Usuario creado con éxito",
            data: nuevoUsuario,
        });
    } catch (error) {
        console.log("Error addUsuarios usuarios", error);
        res.status(500).json({
            code: 500,
            message:
                "Error al crear el nuevo usuario, verifique los datos ingresados.",
        });
    }
};

export const deleteUsuario = async (req, res) => {
    let id = Number(req.params.id);
    try {
        if (isNaN(id)) {
            return res
                .status(400)
                .json({ code: 400, message: "Debe enviar un id númerico." });
        }
        let usuario = await Usuario.findByPk(id, {
            attributes: ["id", "nombre", "apellido", "email"],
        });
        if (!usuario) {
            return res.status(400).json({
                code: 400,
                message: "El usuario que intenta eliminar no existe, id: " + id,
            });
        }

        //ELIMINA EL USUARIO SI ES QUE EXISTE.
        await usuario.destroy();

        res.json({
            code: 200,
            message: `Usuario con id: ${id} eliminado con éxito.`,
        });
    } catch (error) {
        console.log("Error deleteUsuario", error);
        res.status(500).json({
            code: 500,
            message: "Error al eliminar el usuario con id: " + id,
        });
    }
};

export const updateUsuario = async (req, res) => {
    let id = Number(req.params.id);
    try {
        if (isNaN(id)) {
            return res
                .status(400)
                .json({ code: 400, message: "Debe enviar un id númerico." });
        }

        let usuario = await Usuario.findByPk(id, {
            attributes: ["id", "nombre", "apellido", "email", "imagen"],
        });

        if (!usuario) {
            return res.status(400).json({
                code: 400,
                message:
                    "El usuario que intenta actualizar no existe, id: " + id,
            });
        }

        let { nombre, apellido, email, imagen, direccion, comuna, ciudad } = req.body;
        usuario.update(
            {
                nombre,
                apellido,
                email,
                imagen
            },
        );

        await Direccion.update(
            {
                direccion,
                comuna,
                ciudad,
            },
            {
                where: {
                    usuarioId: usuario.id,
                },
            }
        );

        res.status(201).json({
            code: 201,
            message: "Usuario actualizado con éxito.",
            data: usuario,
        });
    } catch (error) {
        console.log("Error updateUsuario", error);
        res.status(500).json({
            code: 500,
            message: "Error al intentar actualizar el usuario",
        });
    }
};


export const findAllUsuariosOutProjecto = async (req, res) => {
    try {
        let { proyectoId } = req.params;

        let rows = await sequelize.query(
            `
            select u."id", u."nombre", u."apellido" from "Usuarios" u
            full outer join "ProyectosUsuarios" pu
            on u.id = pu."usuarioId"
            full outer join "Proyectos" p
            on pu."proyectoId" = p.id
            where p.id  <> ? or p.id is null;
            `,
            {
                replacements: [proyectoId],
                type: QueryTypes.SELECT,
            }
        );
    
        

        console.log(rows);
        res.json({ code: 200, message: "ok", data: rows });

    } catch (error) {
        console.log("Error findAllUsuariosOutProjecto usuarios", error);
        res.status(500).json({
            code: 500,
            message: "Error al obtener los datos de usuarios.",
        });
    }
};
