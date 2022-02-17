// 1. IMPORTACIONES
const mongoose = require("mongoose")


// 2. SCHEMA
const newOrderSchema = mongoose.Schema({

	breed: {
		type: String,
		required: true
	},
	ownerName: {
		type: String
	},
	dogYears: {
		type: Number,
	},
	typeofService: {
		type:String,
	},
    foundUser: {
        type: String,
        required: true
    },


})

// 3. MODEL
const newOrder = mongoose.model("newOrder", newOrderSchema)

// 4. EXPORTACIÓN
module.exports = newOrder