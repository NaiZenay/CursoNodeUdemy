import express from "express";
import {myProperties,create} from "../controllers/properties.controller.js"


const router=express()

router.route("/admin")
.get(myProperties)

router.route("/create")
.get(create)

export default router;