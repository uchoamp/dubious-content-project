const indexCtrl = {};
const { paginate } = require("../libs/paginate");

indexCtrl.renderIndex = async (req, res) => {
  const {hgames, totalPages} = await paginate();
  res.render("", { hgames, totalPages });
};

module.exports = indexCtrl;
