// ./controllers/authController
const bcryptjs		= require("bcryptjs")
const mongoose		= require("mongoose")
const User			= require("./../models/User")
const Estetica			= require("./../models/Estetica")
const Photo			= require("./../models/Photo")
const Hotel			= require("./../models/Hotel")
const UserData		= require("./../models/UserData")
const NewOrders		= require("./../models/NewOrders")


exports.register = (req, res) => {

	res.render("auth/register")

}

exports.registerForm = async (req, res) => {

	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL CONTROLLER
	const { username, email, password, confirmpassword } = req.body


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

	if(password != confirmpassword){
		return res.render("auth/register", {
			errorMessage: "Las contraseñas no coinciden."
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
			password: hashedPassword,
			confirmpassword

		})
	
		
	
		return res.redirect("/profile")

	} catch (error) {
		

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
			return
		}

		res.redirect("/")


	})

}

exports.getEstetica = async (req, res) => {

	try {
	
		const foundEstetica = await Estetica.find({})
		
		res.render("services/beautyShop", {
			data: foundEstetica
			
		})

	} catch (error) {
		

	}	

}

exports.getPhoto = async (req, res) => {

	try {
	
		const foundPhoto = await Photo.find({})

		
		res.render("services/photoStudio", {
			data: foundPhoto
			
		})

	} catch (error) {
		
		return

	}	

}

exports.getHotel = async (req, res) => {

	try {
	
		const foundHotel = await Hotel.find({})

		
		res.render("services/hotel", {
			data: foundHotel
			
		})

	} catch (error) {
		
		return

	}	

}
// exports.createUser = async (req, res) => {

// 	return res.render("profile/dataProfileP",{
		
// 	})

// }


// exports.createUserForm = async (req, res) => {

// 	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL SERVIDOR
// 	const { name, address, country } = req.body
// 	console.log(req.body)
// 	// const title = req.body.title
	
// 	// 2. CREAR EL DOCUMENTO EN BASE DE DATOS
// 	try {
//         //await Book.create({ title, description, author, rating })
//         await UserData.create({ name, address, country })
//         return res.redirect("/profile")//falta ponerl algo

//     }catch(error){
//         console.log(error)
//     }

// }

exports.getDetails = async (req, res) => {


		// req.params === { roomID: "65as4df56as4d" }
		const { userID } = req.params

		console.log(userID)
		console.log(typeof userID)

		const singleUser = await UserData.findById(userID)
		console.log(singleUser)

		return res.render("profile/dataSaved", {
			singleUser
		})


}

exports.createOrder = async (req, res) => {

    res.render("profile/newOrder")

}

exports.createOrderForm = async (req, res) => {

	const id = req.session.currentUser._id
	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL SERVIDOR
	// const { breed, ownerName, dogYears  } = req.body;

	// // const title = req.body.title
	
	// // 2. CREAR EL DOCUMENTO EN BASE DE DATOS

    //     //await Book.create({ title, description, author, rating })
	// await NewOrders.findByIdAndUpdate(
	// 	id,{ breed, ownerName, dogYears  },
	// 		{new:true}

	// )
    //     return res.redirect("/profile")
	const { breed, ownerName, dogYears, typeofService } = req.body;
	const newOrderD = new NewOrders({ breed, ownerName, dogYears, typeofService })
	console.log(newOrderD)
	newOrderD.foundUser = id;
	await newOrderD.save()
	res.redirect("/profile")


}

exports.getAllOrders = async (req, res) => {
	const id = req.session.currentUser._id
	const allOrders = await NewOrders.find({foundUser: id})
	res.render('profile/allOrders',{allOrders})
}

exports.getEditOrder = async (req, res) => {

    const {id}=req.params
    const foundEdit = await NewOrders.findById(id)

    res.render("profile/editOrder", {foundEdit})

}

exports.getEditForm = async (req, res) => {

    //NECESITO EL ID DEL LIBRO PARA EDITAR
    const {id} =req.params
    //DATOS DEL FORMULARIO NUEVOS CON LOS CUALES VOY A ACTUALIZAR
    const { breed, ownerName, dogYears, typeofService  } = req.body
    //actualizar base de datos
    const updateOrders = await NewOrders.findByIdAndUpdate(
        id,{ breed, ownerName, dogYears, typeofService  },
        {new:true}
    )

    // REDIRECCIONAR A LA PAGINA INDIVIDUAL DEL LIBRO
        return res.redirect('/profile')
}

exports.deleteForm = async(req, res) => {

    //NECESITO EL ID DEL LIBRO PARA EDITAR
    const {id} =req.params
    //DATOS DEL FORMULARIO NUEVOS CON LOS CUALES VOY A ACTUALIZAR
    //const deleteBook = await Book.findByIdAndDelete(bookID)
    await NewOrders.findByIdAndDelete(id)
    res.redirect("/profile")
}

exports.createProfileP = async (req, res) => {

    res.render("profile/dataProfileP")

}

exports.createProfilePForm = async (req, res) => {

	const id = req.session.currentUser._id
	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL SERVIDOR
	// const { breed, ownerName, dogYears  } = req.body;

	// // const title = req.body.title
	
	// // 2. CREAR EL DOCUMENTO EN BASE DE DATOS

    //     //await Book.create({ title, description, author, rating })
	// await NewOrders.findByIdAndUpdate(
	// 	id,{ breed, ownerName, dogYears  },
	// 		{new:true}

	// )
    //     return res.redirect("/profile")
	const { name, address, country } = req.body;
	const newprofileP = new UserData({ name, address, country })
	newprofileP.foundUser = id;
	if(name !== ''){
		await newprofileP.save()
		res.redirect("/profile")
	}



}

exports.getEditProfile = async (req, res) => {

    const {id}=req.params
    const foundEditProfile = await UserData.findById(id)

    res.render("profile/editProfileP", {foundEditProfile})

}

exports.getEditProfileForm = async (req, res) => {

    //NECESITO EL ID DEL LIBRO PARA EDITAR
    const {id} =req.params
    //DATOS DEL FORMULARIO NUEVOS CON LOS CUALES VOY A ACTUALIZAR
    const { name, address, country } = req.body
    //actualizar base de datos
    const updateEditProfile = await UserData.findByIdAndUpdate(
        id,{ name, address, country },
        {new:true}
    )

    // REDIRECCIONAR A LA PAGINA INDIVIDUAL DEL LIBRO
        return res.redirect("/profile")
}

exports.getAboutUs = async (req, res) => {

    res.render("services/aboutUs")

}
exports.getlocation = async (req, res) => {

    res.render("services/location")

}
