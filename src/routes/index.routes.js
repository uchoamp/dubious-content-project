const { Router } = require("express");
const {renderIndex} = require('../controllers/index.controller')
const router = Router();

// Rota principal
router.get("/", renderIndex);

module.exports = router;
