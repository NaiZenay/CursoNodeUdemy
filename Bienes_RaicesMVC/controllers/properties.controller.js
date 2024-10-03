import { Category, Price, Property } from "../models/index.js"
import { check, validationResult } from "express-validator"

const myProperties = (req, res) => {
    res.render("props/admin", {
        pagina: "Mis propiedades",
        bar: true
    })
}


const create = async (req, res) => {
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
        Property.findAll()
    ])

    res.render("props/create", {
        pagina: "Crear propiedad",
        bar: true,
        csrfToken: req.csrfToken(),
        categories,
        data: {},
        prices

    })
}


const save = async (req, res) => {
    await check("title").notEmpty().withMessage("El titulo no debe ir vacio").run(req),
        await check("description").notEmpty().withMessage("La descripcion no debe ir vacia")
            .isLength({ max: 200 }).withMessage("La Descripcion es muy larga").run(req),
        await check("category").isNumeric().withMessage("Seleccione una categoria").run(req),
        await check("price").isNumeric().withMessage("Seleccione un rango de precios").run(req),
        await check("wc").isNumeric().withMessage("Seleccione la cantidad de baños").run(req),
        await check("parking").isNumeric().withMessage("Seleccione una capacidad de estacionamiento").run(req),
        await check("rooms").isNumeric().withMessage("Seleccione una cantidad de habitaciones").run(req)

    let resu = validationResult(req)
    if (!(resu.isEmpty())) {
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
            Property.findAll()
        ])

        res.render("props/create", {
            pagina: "Crear propiedad",
            bar: true,
            csrfToken: req.csrfToken(),
            categories,
            data: req.body,
            prices,
            errs: resu.array()
        })

        const { title, description, price:priceId, wc, rooms, category:categoryId, parking, lat, lng } = req.body
        try {
            const property = await Property.create({
                title,
                parking,
                description,
                rooms,
                categoryId,
                priceId,
                wc,
                lat,
                lng,
                published:true
            })

        } catch (err) {
            console.log(err)
        }
    }}

    export {
        myProperties, create, save
    }