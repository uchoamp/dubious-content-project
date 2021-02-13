const adminCtrl = {}

const Admin = require("../models/Admin")

// Painel admin
adminCtrl.panel = async (req, res) => {
    res.render("admin/")
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