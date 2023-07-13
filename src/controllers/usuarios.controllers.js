import Usuario from "../models/Usuario.models.js";

export const findAll = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll({
            attributes: ["id", "nombre", "apellido", "email"],
        });
        res.json({ code: 200, message: "ok", data: usuarios });
    } catch (error) {
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
            return res.status(400).json({code: 400, message: "Debe enviar un id númerico."})
        }
        let usuario = await Usuario.findByPk(id, {
            attributes: ["id", "nombre", "apellido", "email"],
        });
        if (!usuario) {
            return res
                .status(400)
                .json({ code: 400, message: "No existe un usuario registrado con el id: " + id });
        }
        res.json({ code: 200, message: "ok", data: usuario });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al obtener el usuario con id: " + id,
        });
    }
};

export const addUsuario = async (req, res) => {
    try {
        let { nombre, apellido, email } = req.body;

        let nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            email,
        });
        res.status(201).json({ code: 201, message: "ok", data: nuevoUsuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message:
                "Error al crear el nuevo usuario, verifique los datos ingresados.",
        });
    }
};
