import Departamento from "../models/Departamento.models.js";

export const findAll = async (req, res) => {
    try {
        let departamentos = await Departamento.findAll({
            order: [["id", "ASC"]]
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
