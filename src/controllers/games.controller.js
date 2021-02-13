const hgamesCtrl = {};
const Game = require("../models/Game");

hgamesCtrl.createHgame = async (req, res) => {
  const game = await Game.findOne({ _id: req.params.urlHgame }).catch((err) => {
    console.log(err)
  });

  if (!game) {
    return res.redirect("/");
  }

  res.render("games/hgames-pages", {game});
};

module.exports = hgamesCtrl;
