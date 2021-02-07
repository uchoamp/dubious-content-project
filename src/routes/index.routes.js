const { Router } = require("express");
const {renderIndex} = require('../controllers/index.controller')
const router = Router();

router.get("/", renderIndex);

module.exports = router;
