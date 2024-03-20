//Utilizaremos mongoose para poder modelar con mongoDB
const mongoose = require('mongoose');

//Utilizamos el objeto mongoose.Schema para crear todo el modelo
const projectSchema = new mongoose.Schema(
    {
        nombre: String,
        descripcion: String

    }
)

//Lo exportaremos como un mongoModel, sino, no nos funcionara a la hora de utilizar en las rutas
module.exports = mongoose.model('Project', projectSchema);