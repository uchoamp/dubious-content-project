const {Router} = require("express")
const {renderResults} = require("../controllers/search.controller")

const router = Router();

router.get("/search", renderResults);


module.exports = router;