const express = require('express');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
config()

//Traemos las routas
const routesProjects = require("./routes/projects.routes");

const app = express();
//Vamos a parsear el body que nos llegue
app.use(bodyParser.json());

//Acceder a la DB de mongoDB
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME});
const db = mongoose.connection;

//Middelware para utilizar las rutas
app.use("/projects", routesProjects);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
});