// Iteration #1

const mongoose = require("mongoose")

//SCHEMA
const esteticaSchema = mongoose.Schema({

    image: {
        type: String,
        required: true,
    },
})

//MODELO
const Estetica = mongoose.model("Estetica", esteticaSchema)

//EXPORTACION
module.exports = Estetica