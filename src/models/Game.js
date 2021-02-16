const { Schema, model } = require("mongoose");
const mogoosePaginate = require("mongoose-paginate-v2");

const hGameSchema = new Schema(
  {
    tittle: String,
    description: String,
    type: String,
    lingue: String,
    tags: String,
    img: String,
    censorship: String,
    platform: String,
    release_date: Date, 
    donwload: String
  },
  {
    timestamps: true,
  }
);

hGameSchema.plugin(mogoosePaginate)

const HGame = model("HGame", hGameSchema);
module.exports = HGame;


// db.hgames.createIndexes([ {tittle:1},{description: 1}, {type:1}, {lingue:1}, {tags:1}, {censorship:1}, {platform:1}, 
// {tittle:"text", description:"text", type:"text", tags:"text", lingue:"text", censorship:"text", pletform:"text"} ])