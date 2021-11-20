const { response } = require("express");
 



const register = (req, resp = response)=>{

    const { email, password } = req.body;

    return resp.json({
        ok: "true",
        message: "The user has been registered"
    });

}

const login = (req, resp = response)=>{

    const { email, password } = req.body;

    return resp.json({
        ok: "true",
        message: "The user has logged in"
    });
}

const accessControl = (req, resp = response)=>{

    return resp.json({
        ok: "true",
        message: "The token is valid"
    });

}



module.exports={
    register,
    login,
    accessControl

}
