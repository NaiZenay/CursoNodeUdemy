//const express=require('express'); common js
import express from 'express';
import router from './routes/userRoutes.js';

// crear la app 
const app = express();

//configuraciones del proyecto
app.set('view engine','pug');//configuracion del template engine
app.set('views','./views');//configuracion del alamcen de vistas

//carpeta publica 
app.use(express.static('public'))

//middleware
app.use('/',router);

//puerto de app
const port=3000;
app.listen(port,()=>{
    console.log(`servidor funcionando en el puerto${port}`)
})
