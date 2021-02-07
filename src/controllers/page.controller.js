const pageCtrl = {}
const { paginate } = require("../libs/paginate");

pageCtrl.renderPage = async (req, res) =>{
    const hgames = (await paginate(req.params.pag))[0];
    res.render("", { hgames });
}

module.exports = pageCtrl;