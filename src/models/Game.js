const { Schema, model } = require("mongoose");
const mogoosePaginate = require("mongoose-paginate-v2");

const gameSchema = new Schema(
  {
    tittle: String,
    description: String,
    type: String,
    language: String,
    tags: String,
    imgs: {cover:String, screenshorts:[String]},
    censorship: String,
    platform: String,
    release_date: String, 
    link_download: String, 
    size: String
  },
  {
    timestamps: true,
  }
);

gameSchema.plugin(mogoosePaginate)

const game = model("Game", gameSchema);
module.exports = game;


// db.hgames.createIndexes([ {tittle:1},{description: 1}, {type:1}, {lingue:1}, {tags:1}, {censorship:1}, {platform:1}, 
// {tittle:"text", description:"text", type:"text", tags:"text", lingue:"text", censorship:"text", pletform:"text"} ])