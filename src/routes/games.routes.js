const {Router} = require('express');

const router = Router();
const {createHgame}= require('../controllers/games.controller')


router.get('/games/:urlHgame', createHgame)

module.exports = router;