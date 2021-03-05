const {Router} = require("express")

const {showCategory} = require("../controllers/category.controller");

const router = Router();

router.get("/c/:field/:value/:page",showCategory);


module.exports = router;