const { Router } = require("express");
const { check } = require("express-validator");
const { register, login, accessControl } = require("../controllers/auth");
const { fieldsValidators } = require("../middlewares/fields-validators");
const { validateJWT } = require("../middlewares/jwt-validator");

const router = Router(); 


// CREATING NEW USER
router.post('/register', [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({min: 5}),
    fieldsValidators
 ],
 register);

// USER LOGIN
router.post('/', [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({min: 5}),
    fieldsValidators
], login);

// TOKEN VALIDATION
router.get('/access-control', validateJWT, accessControl);






module.exports=router; 