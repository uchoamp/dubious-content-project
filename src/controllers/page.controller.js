const pageCtrl = {}
const { paginate } = require("../libs/paginate");

pageCtrl.renderPage = async (req, res) =>{
    const {hgames, totalPages} = await paginate(req.params.pag);
    res.render("", { hgames, totalPages });
}

module.exports = pageCtrl;