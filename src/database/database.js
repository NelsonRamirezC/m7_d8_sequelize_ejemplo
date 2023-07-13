import Sequelize from "sequelize";

let database = "m7_d8_ejemplo_sequelize";
let usuario = "node";
let password = "123456";
let host = "localhost";
const sequelize = new Sequelize(database, usuario, password, {
    host,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 3000,
    },
});

export default sequelize; 