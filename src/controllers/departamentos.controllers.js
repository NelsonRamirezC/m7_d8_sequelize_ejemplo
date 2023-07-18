import Departamento from "../models/Departamento.models.js";
import Usuario from "../models/Usuario.models.js";

export const findAll = async (req, res) => {
    try {
        let departamentos = await Departamento.findAll({
            order: [["id", "ASC"]],
        });
        res.json({ code: 200, message: "ok", data: departamentos });
    } catch (error) {
        console.log("Error findAll departamentos", error);
        res.status(500).json({
            code: 500,
            message: "Error al obtener los datos de departamentos.",
        });
    }
};


export const addDepartamentos = async (req, res) => {
    try {
        let { nombre, codigo } =
            req.body;

        let nuevoDepartamento = await Departamento.create(
            {
                nombre,
                codigo,
            },
        );

        res.status(201).json({
            code: 201,
            message: "Departamento creado con éxito",
            data: nuevoDepartamento,
        });
    } catch (error) {
        console.log("Error addDepartamentos", error);
        res.status(500).json({
            code: 500,
            message:
                "Error al crear el nuevo departamento, verifique los datos ingresados.",
        });
    }
};


export const vincularUsuarioDepto = async (req, res) => {
    let { departamentoId, usuarioId } = req.body;
    try {
        let departamento = await Departamento.findByPk(departamentoId);
        if(!departamento) return res.status(400).json({code: 400, message: "Departamento no existe."})
        let usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) return res.status(400).json({ code: 400, message: "Usuario no existe." })
        
        //vinculamos usuario con departamento.`
        //método N° 1
        /*
        await usuario.update({
            departamentoId: departamento.id
        });
        */
        
        //método 2
        await departamento.addUsuario(usuario);

        res.status(201).json({code: 201, message: "Usuario vinculado con éxito."})
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al vincular usuario con depto."})
    }

}
