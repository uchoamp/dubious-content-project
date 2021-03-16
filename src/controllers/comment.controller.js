const commentCtrl = {};
const Comment = require("../models/Comment");

commentCtrl.commentRender = async (req, res) => {
  const { gameURL} = req.query;

  const comments = await Comment.find({ gameURL }, 'gameURL comment userCommenter.username createdAt reply');
 
  res.json(comments);
};

commentCtrl.commentCreate = async (req, res) => {
  const { comment, gameURL} = req.body;
  const user = req.user;
  if (user) {
    const commentario = await new Comment({
      gameURL,
      comment,
      userCommenter: { username: user.username, user_id: user._id },
    });
    await commentario.save();
    return res.status(200).end();
  }
  req.flash("error", "Ta querendo o que rapa");
  res.status(403).send("login");
};

commentCtrl.commentDelete = async (req, res) => {
  const user = req.user;
  if(user){
    const _id = req.query.comment_id;
    const comment = await Comment.findOne({ _id });

    if((user._id).equals(comment.userCommenter.user_id)){
      await comment.deleteOne()
      return res.status(200).end();
    }else{
      req.logout()
      req.flash('error', 'Faz o login de novo ai corno pra para de ser besta;')
      return res.status(401).end()
    }
  
  }
  res.status(407).send('vai fazer o login corno')
  
};

commentCtrl.replyCreate = async (req, res) => {};

commentCtrl.replyDelete = async (req, res) => {};

module.exports = commentCtrl;
