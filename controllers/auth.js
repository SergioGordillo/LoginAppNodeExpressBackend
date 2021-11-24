const { response } = require("express");
const User = require("../models/User");
const bcrypt = require ("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
 

// USER REGISTER
const register = async (req, resp = response)=>{

    const { name, email, password } = req.body;

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

        const token=await generateJWT(email, name);

        await userDB.save(); 

        return resp.status(201).json({
            ok: true,
            message: "The user has been registered",
            name,
            token
        })

    } catch (err) {
        return resp.status(500).json({
            ok: false,
            message: "Server internal error"
        })
    }

}

// USER LOGIN
const login = async (req, resp = response)=>{

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({email});

        if (!userDB) {
            return resp.status(400).json({
                ok: false,
                message: "Email or password do not exist"
            })
        }

        const correctPassword = bcrypt.compareSync(password, userDB.password);

        if (!correctPassword) {
            return resp.status(400).json({
                ok: false,
                message: "Email or password do not exist"
            })
        }

        const token=await generateJWT(email, userDB.name);
        
        return resp.status(200).json({
            ok: true,
            message: "The user has logged in",
            name: userDB.name,
            token
        })

    } catch (err) {
        return resp.status(500).json({
            ok: false,
            message: "Server internal error"
        });
    }
}

const accessControl = async (req, resp = response)=>{

   const { email, name } = req;
  
   const token  = await generateJWT(email, name);

    return resp.json({
        ok: true,
        message: "The token is valid", 
        name, 
        token
    });

}



module.exports={
    register,
    login,
    accessControl

}
