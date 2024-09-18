import sequelize from "sequelize"
import doteenv from "dotenv"
doteenv.config({path:".env"})

const db= new sequelize(process.env.BD_NOMBRE,process.env.BD_USER, process.env.BD_PASSWORD,{
        host: process.env.BD_HOST,
        port: "3306",
        dialect:"mysql",
        define:{
            tiemstamps:"true"
        },
        pool:{
            max: 5, //max conexiones
            min: 0, //min conexiones
            acquire: 30000, //timepo para crear una conxion
            idle: 10000 //tiempo antes de finalizar una conexion
        },
        operatorAliases:false
    });
 export default db;