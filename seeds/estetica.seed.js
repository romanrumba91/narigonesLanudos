// Iteration #1
const mongoose		= require("mongoose")
const Estetica 			= require("../models/Estetica")
const connectDB		= require("../config/db")

require("dotenv").config()

connectDB()


const perros = [
    { image: "https://i.postimg.cc/8zjhJbfH/2022-01-26-16-38-04.jpg" },
    { image: "https://i.postimg.cc/C1hF6c0T/2022-01-29-12-04-22.jpg" },
    { image: "https://i.postimg.cc/G2KvZgsk/2022-01-29-12-32-07.jpg" },
    { image: "https://i.postimg.cc/qBm8wYrr/2022-01-30-15-04-30.jpg" },
    { image: "https://i.postimg.cc/qRJ3XcZg/2022-01-30-15-25-52.jpg" },
    { image: "https://i.postimg.cc/W35J9DQ8/2022-01-30-18-04-03.jpg" },
    { image: "https://i.postimg.cc/nzhXQFCD/2022-02-01-16-28-11.jpg" },
    { image: "https://i.postimg.cc/y8hxQgRR/2022-02-01-18-31-17.jpg" },
    { image: "https://i.postimg.cc/nLHz6FKP/2022-02-02-14-37-13.jpg" },
    { image: "https://i.postimg.cc/xjbzGd6v/2022-02-02-16-37-37.jpg" },
    { image: "https://i.postimg.cc/L6pnz3YS/2022-02-05-09-48-54.jpg" },
    { image: "https://i.postimg.cc/Qd6CZL6N/2022-02-05-12-56-48.jpg" },
    { image: "https://i.postimg.cc/qR2pRWG3/2022-02-05-14-51-48.jpg" },
    { image: "https://i.postimg.cc/zDSJ1Zvm/2022-02-05-15-48-26.jpg" },
    { image: "https://i.postimg.cc/xdz2xBh4/2022-02-06-15-59-58.jpg" },
    { image: "https://i.postimg.cc/85gVqtVP/2022-02-09-12-20-56.jpg" },
    { image: "https://i.postimg.cc/yY8z4D29/2022-02-09-18-34-07-3.jpg" },
    { image: "https://i.postimg.cc/3JfQKKHq/2022-02-10-12-05-52.jpg" },
    { image: "https://i.postimg.cc/bwKXt3rH/2022-02-11-15-16-03.jpg" },
    { image: "https://i.postimg.cc/76kpBhg5/2022-02-11-18-18-14.jpg" },
    { image: "https://i.postimg.cc/653FbDGf/2022-02-12-18-04-50.jpg" },


  ];

  const createEstetica = async (data) => {
 
    try {
        const createEstetica = await Estetica.create(data)

        console.log(createEstetica)

        // DESCONECTAR LA PETICIÓN A BASE DE DATOS
        return mongoose.connection.close()	

    } catch (error) {
        
        console.log(error)
        process.exit(1)

    }


}

createEstetica(perros)