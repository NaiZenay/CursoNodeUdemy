import categories from "./categories.js";
import Category from "../models/Category.js"
import Price from "../models/Price.js";
import price from "./price.js"
import db from "../config/db.js"

const importData = async () => {
    try {
        // Autenticacion
        await db.authenticate()
        //Columnas
        await db.sync()
        //Insertar Data

        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(price)
        ])

        console.log("si jalo")
        exit()

    } catch (erro) {
        process.exit(1)
    }
}

const deleteData = async () => {
    try {
        await Promise.all([
            Category.destroy({where:{},truncate:true}),
            Price.destroy({where:{},truncate:true}),
        ])
        exit()

        console.log("si jalo")
        exit()

    } catch (erro) {
        process.exit(1)
    }
}

if (process.argv[2] === "-i") {
    importData();
}

if (process.argv[2] === "-d") {
    importData();
}