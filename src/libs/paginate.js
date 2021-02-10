const HGame = require("../models/hGame");
const modulo = {};
modulo.paginate = async function (page, limit, query) {
    let hgames = {};
    if (query) {

        hgames = await HGame.paginate({
            $or: [{ $text: { $search: `${query}` } }, {
                tittle
                    : { $regex: `${query}`, $options: "i" }
            }, {
                description
                    : { $regex: `${query}`, $options: "i" }
            }, {
                 type
                    : { $regex: `${query}`, $options: "i" }
            }, {
                tags
                    : { $regex: `${query}`, $options: "i" }
            }, {
                lingue
                    : { $regex: `${query}`, $options: "i" }
            }, {
                censorship
                    : { $regex: `${query}`, $options: "i" }
            }, {
                platform
                    : { $regex: `${query}`, $options: "i" }
            }]
        }, {
            limit: limit || 9, page: page || 1, sort: {score: { $meta: "textScore" }, createdAt: "desc" }
        });

    } else {
        hgames = await HGame.paginate({}, { limit: limit || 9, page: page || 1, sort: { createdAt: "desc" } });
    }

    return { hgames: hgames.docs, totalPages: hgames.totalPages }
}

module.exports = modulo;