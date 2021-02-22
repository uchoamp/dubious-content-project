const { Schema, model } = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true, unique:true, min: 4},
  email: { type: String, required:true, unique:true},
  password: { type: String, required: true, min: 6 },
  birthday: {type: Date, required: true},
  block: {type: Boolean, default: false}
},{
  timestamps: true
}
);

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
