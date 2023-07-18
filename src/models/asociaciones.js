import Direccion from "./Direccion.models.js";
import Usuario from "./Usuario.models.js";
import Departamento from "./Departamento.models.js";
import Proyecto from "./Proyecto.models.js";


//RELACIÓN 1 A 1 ENTRE USUARIO Y DIRECCIÓN
Usuario.hasOne(Direccion, {
    foreignKey: "usuarioId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as: "direccion"
});
Direccion.belongsTo(Usuario, {
    as: "propietario",
    foreignKey: "usuarioId",
});


//RELACIÓN 1 A MUCHOS ENTRE USUARIO Y DEPARTAMENTO
Usuario.belongsTo(Departamento, {
    as: "Departamento",
    foreignKey: "departamentoId",
});

Departamento.hasMany(Usuario, {
    foreignKey: "departamentoId",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    as: "usuarios",
});


//RELACIÓN muchos a muchos USUARIOS - PROYECTOS

Usuario.belongsToMany(Proyecto, {
    through: "ProyectosUsuarios",
    as: "proyectos",
    foreignKey: "usuarioId"
});
Proyecto.belongsToMany(Usuario, {
    through: "ProyectosUsuarios",
    as: "usuarios",
    foreignKey: "proyectoId",
});