import Usuario from "../models/Usuario.models.js";
import Direccion from "../models/Direccion.models.js";

export const viewHomeController = (req, res) => {
    res.render("home", {
        homeView: true,
    });
};

export const viewUsuariosController = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll({
            raw: true,
            order: [["id", "ASC"]],
            attributes: ["id", "nombre", "apellido", "email"],
            include: [
                {
                    model: Direccion,
                    as: "direccion",
                    attributes: { exclude: ["usuarioId"] },
                    raw: true,
                },
            ],
        });
        usuarios = usuarios.map(usuario => {
            usuario.direccion = {
            id: usuario["direccion.id"],
            direccion: usuario["direccion.direccion"],
            comuna: usuario["direccion.comuna"],
            ciudad: usuario["direccion.ciudad"],
            };
            return usuario;
        })
        console.log(usuarios);
        res.render("usuarios", {
            usuariosView: true,
            usuarios,
        });
    } catch (error) {
        console.log(error);
        res.render("usuarios", {
            usuariosView: true,
            error: true,
        });
    }
};


export const viewDetailsUsuarioController = async (req, res) => {
    try {
        let id = req.params.id;
        let usuario = await Usuario.findByPk(id, {
            raw: true,
            include: [
                {
                    model: Direccion,
                    as: "direccion",
                    attributes: { exclude: ["usuarioId"] },
                },
            ],
        });
        usuario.direccion = {
            id: usuario["direccion.id"],
            direccion: usuario["direccion.direccion"],
            comuna: usuario["direccion.comuna"],
            ciudad: usuario["direccion.ciudad"],
        };
        res.render("detailsUsuario", {
            usuario
        });
    } catch (error) {
        console.log(error);
        res.render("detailsUsuario", {
            error: true
        });
    }
}