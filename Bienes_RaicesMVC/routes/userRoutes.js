import express from 'express';
import { formLogin,register,forgot_Password } from '../controllers/user.controller.js';
const router = express();

router.get('/',function (request,response){
    response.send("Hola mundo en express");
})

router.route('/login')
.get(formLogin);

router.route('/register')
.get(register)

router.route('/forgotPassword')
.get(forgot_Password)



export default router;
