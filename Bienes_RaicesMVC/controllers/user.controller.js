import User from "../models/User.js"

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