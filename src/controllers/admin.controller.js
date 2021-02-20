const passport = require("passport")
const adminCtrl = {};
const User = require("../models/User");
const Game = require("../models/Game");
const Admin = require("../models/Admin");


// Painel admin
adminCtrl.panel = async (req, res) => {
    const quantUser = await User.count();
    const quantGame = await Game.count();
    res.render("admin/", { quantUser, quantGame })
}

// Admin login
adminCtrl.showLogin = (req, res) => {
    res.render("admin/login")
}
adminCtrl.login = passport.authenticate("admin", {
    successRedirect: "/admin",
    failureRedirect: "/admin/login",
    failureFlash: true,
    successFlash: "Welcome!",
  });
// Adiciona, alterar e delete game
adminCtrl.newGame = async (req, res) => {
    const quantUser = await User.count();
    const quantGame = await Game.count();

    res.render("admin/game", { quantUser, quantGame })
}
adminCtrl.showGame = (req, res) => {
    res.send("Ok")
}
adminCtrl.createGame = async (req, res) => {
    let { tittle, description, type, language,
        censorship, release_date, size, platform, tags, link_download, gameURL } = req.body;

    
    release_date = `${release_date.slice(8, 10)}/${release_date.slice(5, 7)}/${release_date.slice(0, 4)}`

    const cover = req.files.cover[0].filename

    const screenshortsFiles = req.files.screenshort;
    const screenshorts = [undefined, undefined, undefined, undefined]

    if (screenshortsFiles) { for (let i = 0; i < screenshortsFiles.length; i++) { screenshorts[i] = screenshortsFiles[i].filename; } }


    const game = new Game({
        tittle, description, type, size,
        platform, release_date, tags, language, censorship, link_download, gameURL,
        imgs:{cover, screenshorts}
    });

    await game.save();

    req.flash("success_msg", "Game adicionado com sucesso.")
    res.redirect("/admin")
}
adminCtrl.alterGame = async (req, res) => {
    res.send("Ok")
}
adminCtrl.deleteGame = async (req, res) => {
    const game = await Game.findByIdAndDelete(req.params.id);

    res.status(200).send("Game deleta com sucesso")

    
    // res.status(200).end("Nenhum game foi apagado")
}

//logout 
adminCtrl.logout = (req, res) => {
    req.logout();
    res.redirect('/admin/login')
}
module.exports = adminCtrl;