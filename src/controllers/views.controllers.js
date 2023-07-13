export const viewHomeController = (req, res) => {
    res.render("home");
};

export const viewUsuariosController = (req, res) => {
    res.render("usuarios", {
        layout: "secondary",
    });
};
