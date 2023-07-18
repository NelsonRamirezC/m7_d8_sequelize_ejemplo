import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Proyecto = sequelize.define(
    "Proyectos",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        encargado: {
            type: DataTypes.STRING(50),
        },
    },
    {
        timestamps: false,
        tableName: "Proyectos",
    }
);

export default Proyecto;
