// Iteration #1

const mongoose = require("mongoose")

//SCHEMA
const hotelSchema = mongoose.Schema({

    image: {
        type: String,
        required: true,
    },
})

//MODELO
const Hotel = mongoose.model("Hotel", hotelSchema)

//EXPORTACION
module.exports = Hotel