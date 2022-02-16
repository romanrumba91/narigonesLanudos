// Iteration #1
const mongoose		= require("mongoose")
const Photo 			= require("../models/Photo")
const connectDB		= require("../config/db")

require("dotenv").config()

connectDB()


const perrosPhoto = [
    { image: "https://i.postimg.cc/bN1SWNSQ/MG-1650.jpg" },
    { image: "https://i.postimg.cc/65xyrJbT/MG-2232.jpg" },
    { image: "https://i.postimg.cc/4NvnwLjP/MG-3300.jpg" },
    { image: "https://i.postimg.cc/wMXxfM4M/MG-3317.jpg" },
    { image: "https://i.postimg.cc/ZKm59P0d/MG-19318.jpg" },
    { image: "https://i.postimg.cc/tJNydf7V/angel-lola.jpg" },
    { image: "https://i.postimg.cc/qv5rG2BQ/arena2.jpg" },
    { image: "https://i.postimg.cc/jq4rFpdD/can-can.jpg" },
    { image: "https://i.postimg.cc/t4YQ77d6/carne.jpg" },
    { image: "https://i.postimg.cc/SRD3xpJV/Dana.jpg" },
    { image: "https://i.postimg.cc/5N2DkjRr/faraonkira.jpg" },
    { image: "https://i.postimg.cc/8cPX3ntv/foto-blondie1.jpg" },
    { image: "https://i.postimg.cc/7L3BLyR7/foto-luca1.jpg" },
    { image: "https://i.postimg.cc/vTcL5R00/foto-B-N3may21.jpg" },
    { image: "https://i.postimg.cc/gjX8nV05/garfiel.jpg" },
    { image: "https://i.postimg.cc/kDP6GLz6/IMG-0850.jpg" },
    { image: "https://i.postimg.cc/8c6f1TKg/IMG-0815.jpg" },
    { image: "https://i.postimg.cc/rwLYWJr5/IMG-0873.jpg" },
    { image: "https://i.postimg.cc/MZCs2Dtg/Sin-t-tulo-1-copia.jpg" },
 
  ];

  const createPhoto = async (data) => {
 
    try {
        const createPhoto = await Photo.create(data)

        console.log(createPhoto)

        // DESCONECTAR LA PETICIÓN A BASE DE DATOS
        return mongoose.connection.close()	

    } catch (error) {
        
        console.log(error)
        process.exit(1)

    }


}

createPhoto(perrosPhoto)