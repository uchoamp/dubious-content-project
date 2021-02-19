const gamesCtrl = {};
const Game = require("../models/Game");
const { paginate } = require("../libs/paginate");

gamesCtrl.showGame = async (req, res) => {
  const game = await Game.findOne({ _id: req.params.urlHgame }).catch((err) => {
    console.log(err)
  });

  if (!game) {
    return res.redirect("/");
  }

  let others = await Game.find({ $and:[{type: game.type}, {_id: {$ne: game._id}}] }, "_id tittle platform language imgs")
  .sort({ createdAt: "desc" }).limit(4);
  console.log(others)
  res.render("game", { game, others }); 
};

gamesCtrl.getGames = async (req, res) => {
  const games = await paginate(req.query.page, req.query.limit, req.query.query);


  res.json(games);
}

module.exports = gamesCtrl;
