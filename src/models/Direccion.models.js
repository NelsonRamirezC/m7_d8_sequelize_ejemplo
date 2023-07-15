import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Direccion = sequelize.define(
    "Direcciones",
    {
       direccion: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        comuna: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        ciudad: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        timestamps: false,
        tableName: "Direcciones",
    }
);

export default Direccion;
