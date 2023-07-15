import Direccion from "./Direccion.models.js";
import Usuario from "./Usuario.models.js";

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