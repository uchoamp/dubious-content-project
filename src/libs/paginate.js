const HGame = require("../models/hGame");
const modulo = {};
modulo.paginate = async function(page, limit ){
            const hgames = await HGame.paginate({}, { limit: limit || 9, page: page || 1, sort:{createdAt:"desc"} });
            return [hgames.docs, hgames.totalPages]
        }

module.exports = modulo;