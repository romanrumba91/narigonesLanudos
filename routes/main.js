// ./routes/index.js

// 1. IMPORTACIONES
const express			= require("express")
const router			= express.Router()

const mainController 	= require("../controllers/mainController")
const routeGuard			= require("./../middlewares/route-guard")


// 2. ROUTER
// A. HOME
router.get("/", mainController.getHome)

// B. PROFILE
router.get("/profile", routeGuard.privateAreas, mainController.getProfile)


// 3. EXPORTACIÓN
module.exports = router