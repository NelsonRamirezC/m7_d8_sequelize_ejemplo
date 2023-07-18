import Proyecto from "../models/Proyecto.models.js";
import Usuario from "../models/Usuario.models.js";

export const findAll = async (req, res) => {
    try {
        let proyectos = await Proyecto.findAll({
            order: [["id", "ASC"]],
        });
        res.json({ code: 200, message: "ok", data: proyectos });
    } catch (error) {
        console.log("Error findAll proyectos", error);
        res.status(500).json({
            code: 500,
            message: "Error al obtener los datos de proyectos.",
        });
    }
};

export const addProyectos = async (req, res) => {
    try {
        let { nombre, usuarioId } = req.body;
        let usuario = await Usuario.findByPk(usuarioId);

        if(!usuario) return res.status(404).json({code: 404, message: "Encargado no encontrado."})
        
        let nuevoProyecto = await Proyecto.create({
            nombre,
            encargado: `${usuario.nombre} ${usuario.apellido}`
        });

        res.status(201).json({
            code: 201,
            message: "Proyecto creado con éxito",
            data: nuevoProyecto,
        });
    } catch (error) {
        console.log("Error addProyectos", error);
        res.status(500).json({
            code: 500,
            message:
                "Error al crear el nuevo proyecto, verifique los datos ingresados.",
        });
    }
};


export const vincularUsuarioProyecto = async (req, res) => {
    let { proyectoId, usuarioId } = req.body;
    try {
        let proyecto = await Proyecto.findByPk(proyectoId);

        let usuario = await Usuario.findByPk(usuarioId);
        if (!usuario)
            return res
                .status(400)
                .json({ code: 400, message: "Usuario no existe." });

        //método 2
        await proyecto.addUsuario(usuario);

        res.status(201).json({
            code: 201,
            message: "Usuario vinculado con éxito.",
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al vincular usuario con proyecto.",
        });
    }
};

