const categoryCtrl = {};

const {paginateCategory} = require("../libs/paginate");

categoryCtrl.showCategory = async (req, res)=>{
    let {field, value, page} = req.params;
    value = value.replace("-"," ")
    const query = {};
    query[field] = { $regex: `${value}`, $options: "i"} ;
    
    const {games, totalPages} = await paginateCategory(page, 9, query);
    let desc = value+":"
    res.render("", {games, totalPages, desc});
}




module.exports = categoryCtrl;