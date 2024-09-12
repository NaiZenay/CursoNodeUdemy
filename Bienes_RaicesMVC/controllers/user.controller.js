const formLogin=(req,res)=>{
    res.render('auth/login',{
    })//accede a la ruta y usa el templete engine configurado
}

const register=(req,res)=>{
    res.render('auth/register',{
    })//accede a la ruta y usa el templete engine configurado
}
export {
    formLogin,register
}