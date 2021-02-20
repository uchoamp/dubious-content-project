const helpers = {};
const Admin = require("../models/Admin");

helpers.isAdmin = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const admin = await Admin.findOne(req.user);
        if (admin) {
            return next();
        }
    }
    res.status(401).redirect("/admin/login")
}

module.exports = helpers;