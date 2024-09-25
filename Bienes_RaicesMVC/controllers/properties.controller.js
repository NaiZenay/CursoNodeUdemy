
const myProperties =(req,res)=>{
    res.render("props/admin",{
        pagina:"Mis propiedades",
        bar:true
})}


const create=(req,res)=>{
    res.render("props/create",{
        pagina:"Crear propiedad",
        bar:true
    })}

export {
    myProperties,create
}