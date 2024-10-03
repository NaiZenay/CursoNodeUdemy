import express from "express";
import { myProperties, create, save } from "../controllers/properties.controller.js"

const router = express()

router.route("/admin")
    .get(myProperties)

router.route("/create")
    .get(create)
    .post(save)

export default router;