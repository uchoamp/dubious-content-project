const { Schema, model } = require("mongoose");

const ObjectId = Schema.ObjectId;


const commentSchema = new Schema(
    {
        hgame_id: { type: ObjectId },
        comment: { type: String, minlength: 1, maxlength: 250 },
        userCommenter: { username: String, user_id: ObjectId },
        reply: [Object],

    }, {
    timestamps: true
}
)


const Comment = model('comment', commentSchema)
module.exports = Comment;       