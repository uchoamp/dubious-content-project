const indexCtrl = {};
const { paginate } = require("../libs/paginate");


indexCtrl.renderIndex = async (req, res) => {
  const {games, totalPages} = await paginate();
  
  res.render("", { games, totalPages });
};

module.exports = indexCtrl;
