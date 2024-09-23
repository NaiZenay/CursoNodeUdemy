import express from 'express';
import { formLogin,registerForm,register,forgot_Password,verify,resetPassword,newPassword,verifyToken } from '../controllers/user.controller.js';
const router = express();

router.get('/',function (request,response){
    response.send("Hola mundo en express");
})

router.route('/login')
.get(formLogin)

router.route('/register')
.get(registerForm)
.post(register)

router.route('/forgotPassword')
.get(forgot_Password)
.post(resetPassword)

router.route("/auth/verify/:token")
.get(verify)

router.route("/auth/forgotPassword/:token")
.get(verifyToken)
.post(newPassword)



export default router;
