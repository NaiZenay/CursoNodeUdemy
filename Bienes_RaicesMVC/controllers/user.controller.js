const formLogin = (req, res) => {
    res.render('auth/login', {
        pagina: "Iniciar Sesion"
    })//accede a la ruta y usa el templete engine configurado
}

const register = (req, res) => {
    res.render('auth/register', {
        pagina: "Crear Cuenta"
    })
}

const forgot_Password = (req, res) => {
    res.render('auth/forgotPassword', {
        pagina: "Olvide mi contraseña"
    })
}
export {
    formLogin, register,forgot_Password
}