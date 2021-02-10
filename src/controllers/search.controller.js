const { search } = require("../server");
const {paginate} = require("../libs/paginate")

const searchCrtl = {};

searchCrtl.renderResults = async (req, res)=>{
    const q = req.query.q;
    const {hgames, totalPages} = await paginate(req.query.p, req.query.l, q);

    res.render("", { hgames, totalPages, q });
}

module.exports = searchCrtl;