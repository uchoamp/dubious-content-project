const {Router} = require('express')
const {renderPage} = require('../controllers/page.controller');

const router = Router();

router.get('/page/:pag', renderPage);



module.exports = router;