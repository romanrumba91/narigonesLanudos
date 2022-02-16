// ./controllers/authController
const bcryptjs		= require("bcryptjs")
const mongoose		= require("mongoose")

const User			= require("./../models/User")
const Estetica			= require("./../models/Estetica")
const Photo			= require("./../models/Photo")
const Hotel			= require("./../models/Hotel")
const UserData		= require("./../models/UserData")


exports.register = (req, res) => {

	res.render("auth/register")

}

exports.registerForm = async (req, res) => {

	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL CONTROLLER
	const { username, email, password } = req.body


	// --- VALIDACIONES ---
	// A. VERIFICAR QUE NO HAYA ESPACIOS VACÍOS
	if(!username || !email || !password){

		return res.render("auth/register", {
			errorMessage: "Todos los campos deben llenarse."
		})
	}	

	// B. QUE LA CONTRASEA SEA SÓLIDA (Al menos 6 caracteres, un número, una minúscula y una mayúscula)
	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

	if(!regex.test(password)){
		
		return res.render("auth/register", {
			errorMessage: "Tu contraseña debe incluir 6 caracteres, al menos un número, una minúscula y una mayúscula."
		})

	}



	// 2. ENCRIPTAR CONTRASEÑA
	// A. ¿Cuántas veces vamos a revolver la contraseña?
	const salt = await bcryptjs.genSalt(10)

	// B. Revolver la contraseña con el "salt"
	const hashedPassword = await bcryptjs.hash(password, salt)

	// C. GUARDAR EN BASE DE DATOS

	try {
		const newUser = await User.create({
			username,
			email, 
			password: hashedPassword
		})
	
		console.log(newUser)
	
		return res.redirect("/profile")

	} catch (error) {
		
		// console.log(error)

		// console.log(error.errors)

		// CONFIRMAR SI EL ERROR VIENE DE BASE DE DATOS
		if (error instanceof mongoose.Error.ValidationError){
			
			return res.render("auth/register", {
				errorMessage: "Por favor utiliza un correo electrónico real."
			})
		}

		return

	}
	

}


exports.login = (req, res) => {

	res.render("auth/login")

}

exports.loginForm = async (req, res) => {

	console.log(req.body)

	// 1. OBTENCIÓN DE DATOS DEL FORMULARIO
	const { email, password } = req.body

	// 2. VALIDACIÓN DE USUARIO ENCONTRADO EN BD

	const foundUser = await User.findOne({ email })

	if(!foundUser){

		res.render("auth/login", {
			errorMessage: "Email o contraseña sin coincidencia."
		})

		return
	}

	// 3. VALIDACIÓN DE CONTRASEÑA

	const verifiedPass = await bcryptjs.compareSync(password, foundUser.password)

	if(!verifiedPass){

		res.render("auth/login", {
			errorMessage: "Email o contraseña incorrecta."
		})

		return

	}

	// 4. GESTIÓN DE SESIÓN. SI LA CONTRESEÑA COINCIDE ENTONCES CREAR UN RECORDATORIO (COOKIE) EN EL NAVEGADOR DE QUE SÍ ES EL USUARIO

	req.session.currentUser = {
		_id : foundUser._id,
		username: foundUser.username,
		email: foundUser.email,
		msg: "Este es su ticket"
	}

	// 5. REDIRECCIÓN AL PROFILE
	return res.redirect("/profile")


}

exports.logout = async (req, res) => {

	req.session.destroy((error) => {

		if(error){
			console.log(error)
			return
		}

		res.redirect("/")


	})

}

exports.getEstetica = async (req, res) => {

	try {
	
		const foundEstetica = await Estetica.find({})
		console.log(foundEstetica)
		
		res.render("services/beautyShop", {
			data: foundEstetica
			
		})

	} catch (error) {
		
		console.log(error)

	}	

}

exports.getPhoto = async (req, res) => {

	try {
	
		const foundPhoto = await Photo.find({})
		console.log(foundPhoto)
		
		res.render("services/photoStudio", {
			data: foundPhoto
			
		})

	} catch (error) {
		
		console.log(error)

	}	

}

exports.getHotel = async (req, res) => {

	try {
	
		const foundHotel = await Hotel.find({})
		console.log(foundHotel)
		
		res.render("services/hotel", {
			data: foundHotel
			
		})

	} catch (error) {
		
		console.log(error)

	}	

}
exports.createUser = async (req, res) => {

	return res.render("profile/dataProfileP",{
		data
	})

}


exports.createUserForm = async (req, res) => {

	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL SERVIDOR
	const { name, address, country } = req.body
	console.log(req.body)
	// const title = req.body.title
	
	// 2. CREAR EL DOCUMENTO EN BASE DE DATOS
	try {
        //await Book.create({ title, description, author, rating })
        await UserData.create({ name, address, country })
        return res.redirect("/profile")//falta ponerl algo

    }catch(error){
        console.log(error)
    }

}




