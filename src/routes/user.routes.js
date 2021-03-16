const { Router } = require("express");
const {login, signup, signupForm, loginForm, logout} = require('../controllers/user.controller')
const router = Router();

// cadastro
router.get("/signup", signupForm);
router.post("/signup", signup);

// login
router.get("/login", loginForm);
router.post("/login", login);

//logout
router.get('/logout', logout)

module.exports = router;
