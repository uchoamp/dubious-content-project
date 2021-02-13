const {Router} = require('express');

const router = Router();
const {showGame, getGames}= require('../controllers/games.controller')

// Mostrando game
router.get('/game/:urlHgame', showGame);

// Pegando games
router.get("/games", getGames);

module.exports = router;