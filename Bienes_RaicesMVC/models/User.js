import {DataTypes, Sequelize} from "sequelize";
import db from "../config/db.js";

//Creacion del modelo con el ORM de sequelize 
const User=db.define("usuarios",{//definicipn de tabla
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },

    email:{
        type:DataTypes.STRING,
        allowNull:false
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false
    },

    token:{
        type:DataTypes.STRING
    },
    confirmado:{
        type:DataTypes.BOOLEAN
    }


})

export default User;