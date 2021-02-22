const fse = require("fs-extra");
const path = require("path");

const removeFiles = {};


removeFiles.removeImgs = async (cover, screenshorts) => {
    if (cover) {
        await fse.remove(path.resolve("./src/public/img/games/covers/" + cover))
    }
    if (screenshorts) {
        for (screenshort of screenshorts) {
            if (screenshort) {
                await fse.remove(path.resolve("./src/public/img/games/screenshorts/" + screenshort))
            }
        }
    }

}



module.exports = removeFiles;