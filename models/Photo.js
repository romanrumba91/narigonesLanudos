// Iteration #1

const mongoose = require("mongoose")

//SCHEMA
const photoSchema = mongoose.Schema({

    image: {
        type: String,
        required: true,
    },
})

//MODELO
const Photo = mongoose.model("Photo", photoSchema)

//EXPORTACION
module.exports = Photo