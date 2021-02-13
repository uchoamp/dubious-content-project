const adminCtrl = {}
const User = require("../models/User")
const Game = require("../models/Game")
const Admin = require("../models/Admin")

// Painel admin
adminCtrl.panel = async (req, res) => {
    const quantUser = await User.count();
    const quantGame = await Game.count();
    res.render("admin/", {quantUser, quantGame})
}

// Admin login
adminCtrl.showLogin = (req, res) => {
    res.send("Ok")
}
adminCtrl.login = async (req, res) => {
    res.send("login Ok")
}

// Adiciona, alterar e delete game
adminCtrl.newGame = (req, res) => {
    res.send("novo game")
}
adminCtrl.showGame = (req, res) => {
    res.send("Ok")
}
adminCtrl.createGame = async (req, res) => {
    res.send("Ok")
}
adminCtrl.alterGame = async (req, res) => {
    res.send("Ok")
}
adminCtrl.deleteGame = async (req, res) => {
    res.send('jkas')
}

//logout 
adminCtrl.logout = (req, res) => {
    req.logout();
    res.redirect('/admin/login')
}
module.exports = adminCtrl;