import User from "../models/User.js"
import { check, validationResult } from "express-validator"
import generateToken from "../helpers/tokens.js"
import emailRegister from "../helpers/emails.js"
import csurf from "csurf"

const formLogin = (req, res) => {
    res.render('auth/login', {
        pagina: "Iniciar Sesion"
    })//accede a la ruta y usa el templete engine configurado
}

const registerForm = (req, res) => {
    res.render('auth/register', {
        pagina: "Crear Cuenta",
        csurfToken: req.csurfToken()
    })
}

const register = async (req, res) => {
    //validaciones
    await check("name").notEmpty().withMessage("EL nombre esta vacio").run(req)
    await check("email").isEmail().withMessage("Eso no es un email").run(req)
    await check("password").isLength({ min: 6 }).withMessage("El password debe ser de al menos 6 caracteres").run(req)
    await check("repetir-password").equals(req.body.password).withMessage("Los passwords no coinciden").run(req)

    let result = validationResult(req)
    //verificar q no haya errores vacio
    if (!(result.isEmpty())) {
        return res.render("auth/register", {
            pagina: "Crea Cuenta",
            csurfToken: req.csurfToken(),
            errores: result.array(),
            userInfo: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }
    const { name, email, password } = req.body;

    //verificar usario registrado
    const userExist = await User.findOne({ where: { email } })
    console.log(userExist)

    if ((userExist)) {
        return res.render("auth/register", {
            pagina: "Crea Cuenta",
            errores: [{ msg: "El usuario ya existe" }],
            userInfo: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }

    const user = await User.create({
        name,
        email,
        password,
        token: generateToken()
    });

    //email de confirmacion
    emailRegister({
        name: user.name,
        email: user.email,
        token: user.token
    })

    res.render("templates/message", {
        pagina: "Cuenta Creada y registrada",
        message: "Enviamos un email de confirmacion"
    })

}

const verify = async (req, res) => {
    //parametros de la URL
    const { token } = req.params
    const userExist = await User.findOne({ where: { token } })

    if (!userExist) {
        return res.render("auth/verify-account", {
            pagina: "Error",
            message: "Error en la validación del token",
            error: true
        });
    }

    // Confirmación de la cuenta
    userExist.token = null; // Eliminar el token después de usarlo
    userExist.confirmado = true; // Marca la cuenta como confirmada
    await userExist.save();

    res.render("auth/verify-account", {
        pagina: "Cuenta Verificada",
        message: "Tu cuenta ha sido verificada correctamente",
        error: false
    });

}

const forgot_Password = (req, res) => {
    res.render('auth/forgotPassword', {
        pagina: "Olvide mi contraseña"
    })
}
export {
    formLogin, register, registerForm, forgot_Password, verify
}