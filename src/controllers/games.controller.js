const gamesCtrl = {};
const Game = require("../models/Game");
const { paginate } = require("../libs/paginate");

gamesCtrl.showGame = async (req, res) => {
  const gameURL = req.params.gameURL;
  const game = await Game.findOne({ gameURL }).catch((err) => {
    console.log(err)
  });

  if (!game) {
    return res.redirect("/");
  }

  let others = await Game.find({ $and:[{type: game.type}, {_id: {$ne: game._id}}] }, {_id: 0, gameURL:1, tittle:1, platform:1, language:1, imgs:1})
  .sort({ createdAt: "desc" }).limit(4);
  
  res.render("game", { game, others }); 
};

gamesCtrl.getGames = async (req, res) => {
  if(req.query.gameURL || req.query.gameURL === ''){
    const gameURLs = await Game.find({gameURL: {$ne: req.query.gameURL}}, {_id:0, gameURL:1});

    return res.json(gameURLs);
  }

  const games = await paginate(req.query.page, req.query.limit, req.query.query);
  
  res.json(games);
}

module.exports = gamesCtrl;
