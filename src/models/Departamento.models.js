import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Departamento = sequelize.define(
    "Departamentos",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        codigo: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "No se permiten string vacíos.",
                },
            },
        },
    },
    {
        timestamps: false,
        tableName: "Departamentos",
    }
);

export default Departamento;
