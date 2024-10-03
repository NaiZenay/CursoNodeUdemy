import {DataTypes} from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcrypt"

//Creacion del modelo con el ORM de sequelize 
const User=db.define("usuarios",{//definicipn de tabla
    name:{
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
    verified:{
        type:DataTypes.BOOLEAN
    }

},{
    // hashing de password
    hooks:{
        beforeCreate:async function (user) {
            const salt=await bcrypt.genSalt(10)
            user.password=await bcrypt.hash(user.password,salt);
        }
    }
})


User.prototype.verifyPassword= function(password){
    return bcrypt.compareSync(password,this.password);
}

export default User;