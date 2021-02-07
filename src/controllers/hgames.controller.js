const hgamesCtrl = {};
const HGame = require("../models/hGame");

hgamesCtrl.createHgame = async (req, res) => {
  const hgame = await HGame.findOne({ _id: req.params.urlHgame }).catch((err) => {
    console.log(err)
  });

  if (!hgame) {
    return res.redirect("/");
  }
  res.render("games/hgames-pages", {hgame});
};

module.exports = hgamesCtrl;
