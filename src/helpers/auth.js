const helpers = {};
const User = require("../models/User");

helpers.isAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = await User.findOne({$and:[{_id:req.user.id}, {secret:req.user.secret}, {password:req.user.password}]});
        if (user) {
            return next();
        }
    }
    res.status(401).redirect("/")
}

module.exports = helpers;