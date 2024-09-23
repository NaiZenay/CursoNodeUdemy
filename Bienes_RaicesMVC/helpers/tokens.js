import jwt from "jsonwebtoken"


const generateJWT= id => jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "1d"
})

const generateToken=() => Math.random().toString(32) + Date.now().toString(32);

export{
    generateJWT,
    generateToken
}