const {paginate} = require("../libs/paginate")

const searchCrtl = {};

searchCrtl.renderResults = async (req, res)=>{
    const q = req.query.q;
    const {games, totalPages} = await paginate(req.query.p, req.query.l, q);

    res.render("", { games, totalPages, q });
}

module.exports = searchCrtl;