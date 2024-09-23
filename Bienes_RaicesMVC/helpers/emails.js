import nodemailer from "nodemailer"
const emailRegister = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    console.log(data);
    const {email,name,token}=data

    //enviar email
    await transport.sendMail({//info de email
        from:"BienesRaices.com",
        to:email,
        subject:"Confirma tu cuenta en BienesRaices.com",
        html:`
        <p>Hola ${name}, comprueba tu cuenta en bienesRaices.com</p>
        <p>
        Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/verify/${token}">Confirmar Cuenta</a>
        </p>
        <p>Si tu no creaste esta cuenta puede ignorar este mensaje</p>        
        `
    })
}

const emailForgotPassword = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    console.log(data);
    const {email,name,token}=data

    //enviar email
    await transport.sendMail({//info de email
        from:"BienesRaices.com",
        to:email,
        subject:"Restablece tu contraseña en BienesRaices.com",
        html:`
        <p>Hola ${name}, Restablece tu contraseña en BienesRaices.com</p>
        <p>
        Sigue el siguiente enlace para generr una nueva contraseña:
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/forgotPassword/${token}">Restablecer Contraseña</a>
        </p>
        <p>Si tu no solicitaste el cambio puedes ignorar este mensaje</p>        
        `
    })
}

export{
    emailRegister,emailForgotPassword
}