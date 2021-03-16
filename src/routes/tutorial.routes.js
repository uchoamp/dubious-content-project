const router = require("express").Router();

const { showTutorial} = require("../controllers/tutorial.controller");

router.get("/tutorial/:tutor", showTutorial);

module.exports = router;