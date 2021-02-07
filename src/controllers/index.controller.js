const indexCtrl = {};
const { paginate } = require("../libs/paginate");

indexCtrl.renderIndex = async (req, res) => {
  const hgames = (await paginate())[0];
  res.render("", { hgames });
};

module.exports = indexCtrl;
