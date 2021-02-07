const { Schema, model } = require("mongoose");
const mogoosePaginate = require("mongoose-paginate-v2");

const hGameSchema = new Schema(
  {
    tittle: String,
    description: String,
    type: { type: String },
    lingue: String,
    tags: [{ type: String }],
    img: String,
  },
  {
    timestamps: true,
  }
);

hGameSchema.plugin(mogoosePaginate)

const HGame = model("HGame", hGameSchema);
module.exports = HGame;
