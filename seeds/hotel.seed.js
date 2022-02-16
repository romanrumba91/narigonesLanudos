// Iteration #1
const mongoose		= require("mongoose")
const Hotel 			= require("../models/Hotel")
const connectDB		= require("../config/db")

require("dotenv").config()

connectDB()


const perrosHotel = [
    { image: "https://i.postimg.cc/dtQ9KxrH/2021-04-11-14-38-30.jpg" },
    { image: "https://i.postimg.cc/TYhW0Mr6/2021-05-13-14-01-41.jpg" },
    { image: "https://i.postimg.cc/R0x6vW2S/2021-05-21-15-57-13.jpg" },
    { image: "https://i.postimg.cc/br5rWrQj/2021-05-27-15-07-02.jpg" },
    { image: "https://i.postimg.cc/MKhXYc67/2021-05-27-16-15-24.jpg" },
    { image: "https://i.postimg.cc/R0mFjjnq/2021-05-29-10-48-50.jpg" },
    { image: "https://i.postimg.cc/90DFd2sg/2021-05-29-14-51-20.jpg" },
    { image: "https://i.postimg.cc/FKG9w14n/2021-06-03-21-59-12.jpg" },
    { image: "https://i.postimg.cc/wjpRptC6/2021-06-11-22-24-20.jpg" },
    { image: "https://i.postimg.cc/859snsdg/2021-06-17-14-10-48.jpg" },
    { image: "https://i.postimg.cc/T3f1szb1/2021-10-19-11-38-32-1.jpg" },
    { image: "https://i.postimg.cc/W4f4htHq/2022-01-14-22-13-12.jpg" },
    { image: "https://i.postimg.cc/jdKRqzSk/2022-01-22-21-56-31.jpg" },
 
  ];

  const createHotel = async (data) => {
 
    try {
        const createHotel = await Hotel.create(data)

        console.log(createHotel)

        // DESCONECTAR LA PETICIÓN A BASE DE DATOS
        return mongoose.connection.close()	

    } catch (error) {
        
        console.log(error)
        process.exit(1)

    }


}

createHotel(perrosHotel)