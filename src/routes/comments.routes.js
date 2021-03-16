const { Router } = require("express");
const {
  commentRender,
  commentCreate,
  commentDelete,
  replyCreate,
  replyDelete,
} = require("../controllers/comment.controller");
const router = Router();

router.get('/comment', commentRender)
router.post('/comment',commentCreate)
router.delete('/comment', commentDelete)

router.post('/replyComment', replyCreate)
router.delete('/replyComment', replyDelete)



module.exports = router;
