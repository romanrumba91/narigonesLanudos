// 1. IMPORTACIONES
const mongoose = require("mongoose")


// 2. SCHEMA
const userDataSchema = mongoose.Schema({

	name: {
		type: String,
		required: true
	},
	address: {
		type: String
	},
	country: {
		type: String,
	},
})

// 3. MODEL
const UserData = mongoose.model("UserData", userDataSchema)

// 4. EXPORTACIÓN
module.exports = UserData