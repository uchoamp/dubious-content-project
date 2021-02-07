const {Router} = require('express');

const router = Router();
const {createHgame}= require('../controllers/hgames.controller')


router.get('/games/:urlHgame', createHgame)

module.exports = router;