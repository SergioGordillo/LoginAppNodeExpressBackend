const { response } = require("express");
const User = require("../models/User");
const bcrypt = require ("bcryptjs");
 
const register = async (req, resp = response)=>{

    const { email, password } = req.body;

    try {
        const user = await User.findOne({email})

        if (user){
            return resp.status(400).json({
                ok: false,
                message: "This email has already been registered. Please, try with another one. Thanks."
            })
        }

        const userDB=new User(req.body); 

        const salt=bcrypt.genSaltSync();
        userDB.password=bcrypt.hashSync(password, salt);

        await userDB.save(); 

        return resp.status(201).json({
            ok: true,
            message: "The user has been registered"
        })




    } catch (err) {
        return resp.status(500).json({
            ok: false,
            message: "Server internal error"
        })
    }

}

const login = (req, resp = response)=>{

    const { email, password } = req.body;

    return resp.json({
        ok: true,
        message: "The user has logged in"
    });
}

const accessControl = (req, resp = response)=>{

    return resp.json({
        ok: true,
        message: "The token is valid"
    });

}



module.exports={
    register,
    login,
    accessControl

}
