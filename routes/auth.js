const { Router } = require("express");

const router = Router(); 


// CREATING NEW USER
router.post('/register',(req, resp)=>{

    return resp.json({
        ok: "true",
        message: "The user has been registered"
    });

});

// USER LOGIN
router.post('/',(req, resp)=>{

    return resp.json({
        ok: "true",
        message: "The user has logged in"
    });

});

// TOKEN VALIDATION
router.get('/access-control',(req, resp)=>{

    return resp.json({
        ok: "true",
        message: "The token is valid"
    });

});






module.exports=router; 