const {Router} = require('express');
const {isAdmin} = require("../helpers/auth");
const router = Router();
const {showGame}= require('../controllers/game.controller')

// Mostrando game
router.get('/game/:gameURL', showGame);


module.exports = router;