const { Router } = require("express");
const {multer, upload} = require("../middlewares/middlewares");
const {isAdmin} = require("../helpers/auth")

const {panel, showLogin, login, logout,newGame,showGame, createGame, editGame,deleteGame} = require("../controllers/admin.controller")

const router = Router();

// Painel admin
router.get("/admin",isAdmin, panel);

// Login
router.get("/admin/login", showLogin);
router.post("/admin/login", login);

// Adiciona, alterar e delete game
router.get("/admin/new-game", isAdmin, newGame);
router.get("/admin/game/:id", isAdmin, showGame);
router.post("/admin/game", isAdmin, upload, createGame);
router.post("/admin/game/:id/edit", isAdmin, upload, editGame);
router.delete("/admin/game/:id", isAdmin, deleteGame);


//logout
router.get('/admin/logout', isAdmin, logout);


module.exports = router;