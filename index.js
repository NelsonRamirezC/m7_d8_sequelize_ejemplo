import app from "./src/app.js";
import db from "./src/database/database.js";

//modelos
import "./src/models/asociaciones.js";

const PORT = 3000;
const main = async () => {
    try {
        await db.authenticate();
        await db.sync({ force: false, alter: false });
        app.listen(PORT, () => {
            console.log("Servidor escuchando en puerto: " + PORT);
        });
    } catch (error) {
        console.log("Ha ocurrido un error: ", error);
    }
};

main();
