const {Router} = require('express');
const {isAdmin} = require("../helpers/auth");
const router = Router();
const {showGame, getGames}= require('../controllers/games.controller')

// Mostrando game
router.get('/game/:gameURL', showGame);

// Pegando games
router.get("/getGamesJSON", isAdmin,getGames);

module.exports = router;