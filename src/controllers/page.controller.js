const pageCtrl = {}
const { paginate } = require("../libs/paginate");

pageCtrl.renderPage = async (req, res) =>{

    const {games, totalPages} = await paginate(req.params.pag, req.query.limit);
    res.render("", { games, totalPages });
}

module.exports = pageCtrl;