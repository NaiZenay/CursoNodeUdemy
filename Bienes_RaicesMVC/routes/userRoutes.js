import express from 'express';
import { formLogin,register } from '../controllers/user.controller.js';
const router = express();

router.get('/',function (request,response){
    response.send("Hola mundo en express");
})

router.route('/login')
.get(formLogin);

router.route('/register')
.get(register)



export default router;
