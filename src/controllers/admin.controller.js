const passport = require("passport");

const adminCtrl = {};
const User = require("../models/User");
const Game = require("../models/Game");
const Admin = require("../models/Admin");

const { removeImgs } = require("../libs/removeFiles");


// Painel admin
adminCtrl.panel = async (req, res) => {
    const quantUser = await User.countDocuments();
    const quantGame = await Game.countDocuments()

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
    const quantUser = await User.countDocuments();
    const quantGame = await Game.countDocuments();

    res.render("admin/game", { quantUser, quantGame })
}

// MOSTRAR UM GAME JÁ CRIADO PARA EDITA //
adminCtrl.showGame = async (req, res) => {
    const show = await Game.findById(req.params.id);
    let release_date = show.release_date;
    show.release_date = `${release_date.slice(6, 10)}-${release_date.slice(3, 5)}-${release_date.slice(0, 2)}`

    const quantUser = await User.countDocuments();
    const quantGame = await Game.countDocuments();
    show.quantGame = quantGame;
    show.quantUser = quantUser
    res.render("admin/game", show)
}
/////////////////////////////////////////

// CRIAR GAME //
adminCtrl.createGame = async (req, res) => {
    let { tittle, description, type, language,
        censorship, release_date, size, platform, tags, link_download, gameURL } = req.body;

    const URLExist = await Game.find({ gameURL });
    if (URLExist.length != 0) {
        req.flash("error", "URL já existe");
        return res.redirect("/admin")
    }

    release_date = `${release_date.slice(8, 10)}/${release_date.slice(5, 7)}/${release_date.slice(0, 4)}`

    const cover = (req.files.cover) ? req.files.cover[0].filename : undefined;

    const screenshortsFiles = req.files.screenshort;
    const screenshorts = [undefined, undefined, undefined, undefined]

    if (screenshortsFiles) { for (let i = 0; i < screenshortsFiles.length; i++) { screenshorts[i] = screenshortsFiles[i].filename; } }


    const game = new Game({
        tittle, description, type, size,
        platform, release_date, tags, language, censorship, link_download, gameURL,
        imgs: { cover, screenshorts }
    });


    if (gameURL && gameURL != "") {


        const newGame = await game.save()
            .catch(err => console.error(err));

        if (newGame) {
            req.flash("success_msg", "Game adicionado com sucesso.");
            return res.redirect("/admin");
        } else {
            // apagando as imagens caso não seja salvo no banco de dados
            await removeImgs(game.imgs.cover, screenshorts)
            /////////////////

            console.error(error)
            req.flash("error_msg", "O game não foi adicionado")
            return res.redirect("/admin/new-game")
        }

    }

    await removeImgs(game.imgs.cover, screenshorts)
    req.flash("error_msg", "O game não foi adicionado o titulo está vazio")
    res.redirect("/admin/new-game")
}
///////////////////////


// EDTAR GAME //
adminCtrl.editGame = async (req, res) => {
    const { _id, gameURL } = req.body;
    let game = await Game.find({ $or: [{ _id }, { gameURL }] });

    if (game.length == 1 && gameURL != "") {
        game = game[0]

        const imgModified = (Array.isArray(req.body.imgModified)) ? new Array(req.body.imgModified) : req.body.imgModified;
        const newCover = (req.files.cover) ? req.files.cover[0].filename : undefined;
        const newScreenshorts = req.files.screenshort;
        const imgs = game.imgs;
        let oldCover = undefined, oldScreenshorts = [];

        if (imgs && ((imgModified && newScreenshorts.length > 0) || newCover)) {
            if (newCover) {
                oldCover = imgs.cover;
                imgs.cover = newCover;
            }

            if (imgModified) {

                let indexMOD = null;
                for (let i = 0; i < newScreenshorts.length; i++) {
                    indexMOD = imgModified[i]
                    oldScreenshorts.push(imgs.screenshorts[indexMOD]);
                    imgs.screenshorts[indexMOD] = newScreenshorts[i].filename;
                }
            }

            await removeImgs(oldCover, oldScreenshorts);

        }

        let { tittle, description, type, language,
            censorship, release_date, size, platform, tags,
            link_download } = req.body;
        release_date = `${release_date.slice(8, 10)}/${release_date.slice(5, 7)}/${release_date.slice(0, 4)}`


        let oldGame = await Game.findByIdAndUpdate(_id, {
                tittle, description, type, language,
                censorship, release_date, size, platform, tags,
                link_download, imgs, gameURL
            }).catch(err => console.error(err));


        if (oldGame) {
            await removeImgs(oldCover, oldScreenshorts);
            req.flash("success_msg", "Game editado com sucesso;")
            return res.redirect("/admin")
        } else {
            await removeImgs(newCover, newScreenshorts);
            req.flash("error", "Não foi póssivel edita o game");
            return res.redirect("/admin")
        }

    } else {
        req.flash("error", "Não foi póssivel edita o game");
        res.redirect("/admin")
    }


}
//////////////////////

// APAGAR GAME //
adminCtrl.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        const screenshorts = game.imgs.screenshorts;

        await removeImgs(game.imgs.cover, screenshorts)

        res.status(200).json({ deleted: true, message: "Game deletado com sucesso" })

    } catch (error) {
        console.error(error)
        res.status(200).json({ deleted: false, message: "Nenhum game foi apagado" })
    }

}
///////////////////////

//logout 
adminCtrl.logout = (req, res) => {
    req.logout();
    res.redirect('/admin/login')
}


module.exports = adminCtrl;