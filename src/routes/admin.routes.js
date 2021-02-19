const { Router } = require("express");
const {multer, upload} = require("../middlewares/middlewares");

const {panel, showLogin, login, logout,newGame,showGame, createGame, alterGame,deleteGame} = require("../controllers/admin.controller")

const router = Router();

// Painel admin
router.get("/admin", panel);

// Login
router.get("/admin/login", showLogin);
router.post("/admin/login", login);

// Adiciona, alterar e delete game
router.get("/admin/new-game", newGame);
router.get("/admin/game/:id", showGame);
router.post("/admin/game", upload, createGame);
router.put("/admin/game", alterGame);
router.delete("/admin/game/:id", deleteGame);


//logout
router.get('/admin/logout', logout);


module.exports = router;