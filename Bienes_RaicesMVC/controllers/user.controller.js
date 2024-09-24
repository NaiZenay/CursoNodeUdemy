import User from "../models/User.js"
import { check, validationResult } from "express-validator"
import {generateToken,generateJWT} from "../helpers/tokens.js"
import { emailRegister, emailForgotPassword } from "../helpers/emails.js"
import bcrypt from "bcrypt"
const formLogin = (req, res) => {
    res.render('auth/login', {
        pagina: "Iniciar Sesion",
        csrfToken: req.csrfToken(),
    })//accede a la ruta y usa el templete engine configurado
}

const registerForm = (req, res) => {
    res.render('auth/register', {
        pagina: "Crear Cuenta",
        csrfToken: req.csrfToken()
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
            csrfToken: req.csrfToken(),
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
    userExist.verified = true; // Marca la cuenta como confirmada
    await userExist.save();

    res.render("auth/verify-account", {
        pagina: "Cuenta Verificada",
        message: "Tu cuenta ha sido verificada correctamente",
        error: false
    });

}

const forgot_Password = (req, res) => {
    res.render('auth/forgotPassword', {
        csrfToken: req.csrfToken(),
        pagina: "Olvide mi contraseña",
    })
}

const resetPassword = async (req, res) => {
    await check("email").isEmail().withMessage("Eso no es un email").run(req)

    let result = validationResult(req)

    if (!(result.isEmpty())) {
        return res.render("auth/forgotPassword", {
            pagina: "Recupera tu acceso",
            csrfToken: req.csrfToken(),
            errores: result.array(),
        })
    }

    const { email } = req.body;
    const userExist = await User.findOne({ where: { email } })
    if (!userExist) {
        return res.render("auth/forgotPassword", {
            pagina: "Recupera tu acceso",
            csrfToken: req.csrfToken(),
            errores: [{ msg: "El email no esta registrado" }],
        })
    }

    userExist.token = generateToken();
    await userExist.save()
    emailForgotPassword({
        email,
        name: userExist.name,
        token: userExist.token
    })


    res.render("templates/message", {
        pagina: "Recupera tu acceso",
        message: "Enviamos un email con las instrucciones"
    })


}

const verifyToken = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({ where: { token } })
    if (!user) {
        return res.render("auth/verify-account", {
            pagina: "Restablece Constraseña",
            message: "Error en la validación del token",
            error: true
        });
    }
    res.render("auth/reset-password", {
        pagina: "Restablece Constraseña",
        csrfToken: req.csrfToken(),
    });

}

const newPassword = async (req, res) => {
    await check("password").isLength({ min: 6 }).withMessage("El password debe ser de al menos 6 caracteres").run(req)
    let result = validationResult(req)
    if (!(result.isEmpty())) {
        return res.render("auth/reset-password", {
            pagina: "Restablece tu Contraseña",
            csrfToken: req.csrfToken(),
            errores: result.array(),
        })
    }
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: { token } })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt);
    user.token = null;

    await user.save();
    return res.render("auth/verify-account", {
        pagina: "Contraseña Restablecida",
        message: "La contraseña se actualizo correctamente",
    });
}

const login = async (req, res) => {
    await check("email").isEmail().withMessage("Eso no es un email").run(req)
    await check("password").notEmpty().withMessage("El password es obligatorio").run(req)

    let result = validationResult(req)

    if (!(result.isEmpty())) {
        return res.render("auth/login", {
            pagina: "Iniciar Sesion",
            csrfToken: req.csrfToken(),
            errores: result.array(),
            userInfo: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
        return res.render("auth/login", {
            pagina: "Iniciar Sesion",
            csrfToken: req.csrfToken(),
            errores: [{ msg: "El usuario no existe" }],
        })
    }

    if (!user.verified) {
        return res.render("auth/login", {
            pagina: "Iniciar Sesion",
            csrfToken: req.csrfToken(),
            errores: [{ msg: "El usuario no esta verificado" }],
        })
    }

    if (!(user.verifyPassword(password))) {
        return res.render("auth/login", {
            pagina: "Iniciar Sesion",
            csrfToken: req.csrfToken(),
            errores: [{ msg: "Contraseña incorrecta" }],
        })
    }

    const token = generateJWT(user.id)
    return res.cookie("_token",token,{
        httpOnly:true
    }).redirect("/admin")
}



export {
    formLogin, register, registerForm, forgot_Password, verify, resetPassword, newPassword, verifyToken, login
}