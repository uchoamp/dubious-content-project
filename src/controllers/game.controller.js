const gameCtrl = {};
const Game = require("../models/Game");
const { paginate } = require("../libs/paginate");

gameCtrl.showGame = async (req, res) => {
  const gameURL = req.params.gameURL;
  const game = await Game.findOne({ gameURL }).catch((err) => {
    console.log(err)
  });

  if (!game) {
    return res.redirect("/");
  }

  let others = await Game.find({ $and:[{type: game.type}, {_id: {$ne: game._id}}] }, {_id: 0, gameURL:1, tittle:1, platform:1, language:1, imgs:1})
  .sort({ createdAt: "desc" }).limit(4);
  
  res.render("game", { game, others, tittle:game.tittle, 
    canonical:"game/"+game.gameURL , meta_description:`Baixar ${game.tittle}, ${game.type}, ${game.platform}, ${game.language}`, meta_keywords:game.tittle+", "+game.tags+", "+game.platform}); 
};


module.exports = gameCtrl;
