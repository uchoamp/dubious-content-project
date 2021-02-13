const {Schema, model}= require("mongoose");

const adminSchema = new Schema({
    email: {type: String, unique:true, required: true},
    password: {type: String, unique:true, required: true}, 
    secret: String
})

const Admin = model("admin", adminSchema)

module.exports =  Admin;
