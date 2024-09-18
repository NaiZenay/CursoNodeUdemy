import User from "../models/User.js"
import { check,validationResult } from "express-validator"

const formLogin = (req, res) => {
    res.render('auth/login', {
        pagina: "Iniciar Sesion"
    })//accede a la ruta y usa el templete engine configurado
}

const registerForm = (req, res) => {
    res.render('auth/register', {
        pagina: "Crear Cuenta"
    })
}

const register = async(req, res) => {
    //validaciones
    await check("nombre").notEmpty().withMessage("EL nombre esta vacio").run(req)
    await check("email").isEmail().withMessage("Eso no es un email").run(req)
    await check("password").isLength({min:6}).withMessage("El password debe ser de al menos 6 caracteres").run(req)
    await check("repetir-password").equals("password").withMessage("Los passwords no coinciden").run(req)

    let result=validationResult(req)
    //verificar user vacio
    if(result.isEmpty()){
        return res.render("auth/register",{
            pagina:"Crea Cuenta",
            errores:result.array()
        })
    }
    

    const user=await User.create(req.body);
    res.json=user
}

const forgot_Password = (req, res) => {
    res.render('auth/forgotPassword', {
        pagina: "Olvide mi contraseña"
    })
}
export {
    formLogin, register, registerForm, forgot_Password
}