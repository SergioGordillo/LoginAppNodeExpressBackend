const { response } = require("express");
const jwt = require ("jsonwebtoken"); 

const validateJWT= (req, resp=response, next) => {

    const token = req.header("x-token");

    if (!token) {
        return resp.status(401).json({
            ok: false,
            message: "The token is not valid. Please, register or log in again. Thanks.",
        })
    }

    try {

        const { name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.name=name; 

    } catch (err) {
        return resp.status(401).json({
            ok: false,
            message: "The token is not valid. Please, register or log in again. Thanks.",
        })
    }

    next();
}


module.exports = {
    validateJWT
}