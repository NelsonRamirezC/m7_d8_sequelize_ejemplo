export const viewHomeController = (req, res) => {
    res.render("home", {
        homeView: true
    });
};

export const viewUsuariosController = (req, res) => {

    res.render("usuarios", {
        usuariosView: true
    });
};
