// 1. IMPORTACIONES
const express		= require("express")
const router		= express.Router()

const authController		= require("./../controllers/authController")
const routeGuard			= require("./../middlewares/route-guard")

// 2. ROUTER
// A1. SIGNUP - OBTENER PÁGINA
router.get("/register", routeGuard.authAreas, authController.register)

// A2. SIGNUP - ENVIAR FORMULARIO DE SIGNUP
router.post("/register",routeGuard.authAreas, authController.registerForm)

// B1. LOGIN - OBTENER PÁGINA
router.get("/login", routeGuard.authAreas, authController.login)

// B2. LOGIN - ENVIAR FORMULARIO DE LOGIN
router.post("/login",routeGuard.authAreas, authController.loginForm)


// C1. SIGNOUT - CERRAR SESIÓN
router.get("/logout", authController.logout)

// D1. BEAUTYSHOP

router.get("/beautyShop", authController.getEstetica)

// E1. PHOTO

router.get("/photoStudio", authController.getPhoto)

// E1. HOTEL

router.get("/hotel", authController.getHotel)

//CREAR PAGINA PARA CREAR UN LIBRO EN BD
router.get("/:id/dataProfileP", authController.createProfileP)
// ENVIAR DATOS DE FORMULARIO PARA CREAR LIBRO EN BD post SOLO PARA FORMULARIOS
router.post("/:id/dataProfileP", authController.createProfilePForm)

router.get("/dataProfileP/:userID", authController.getDetails)

// NEW ORDERS
router.get("/:id/newOrder", authController.createOrder)

router.post("/:id/newOrder", authController.createOrderForm)
//GET ALL ORDERS
router.get("/allOrders",authController.getAllOrders)

router.get("/edit/:id",authController.getEditOrder)

router.post("/:id/edit",authController.getEditForm)

router.post("/:id/delete", authController.deleteForm)

router.get("/:id/edit",authController.getEditProfile)

router.post("/:id/edit",authController.getEditProfileForm)

router.get("/aboutUs", authController.getAboutUs)

router.get("/location", authController.getlocation)






// 3. EXPORTACIÓN
module.exports = router