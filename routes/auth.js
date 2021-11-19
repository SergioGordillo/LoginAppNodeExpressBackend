const { Router } = require("express");
const { register, login, accessControl } = require("../controllers/auth");

const router = Router(); 


// CREATING NEW USER
router.post('/register', register);

// USER LOGIN
router.post('/', login);

// TOKEN VALIDATION
router.get('/access-control', accessControl);






module.exports=router; 