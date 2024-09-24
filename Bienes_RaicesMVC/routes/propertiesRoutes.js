import express from "express";
import {myProperties} from "../controllers/properties.controller.js"


const router=express()

router.route("/admin")
.get(myProperties)

export default router;