import Usuario from "../models/Usuario.models.js";

export const viewHomeController = (req, res) => {
    res.render("home", {
        homeView: true,
    });
};

export const viewUsuariosController = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll({
            raw: true,
            order: [["id", "ASC"]]
        });

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
            raw: true
        })
        console.log(usuario);
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