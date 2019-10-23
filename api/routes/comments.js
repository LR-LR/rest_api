// Imports
const router = require('express').Router();
const checkAuth = require('../middlewares/check-auth');

// Controller
const CommentsCtrl = require('../controllers/comments');

// Routes
router
  .get('/', CommentsCtrl.get_all)

  .get('/:id', CommentsCtrl.get_one)

  .get('/post/:post_id', CommentsCtrl.get_all_by_post_id)

  .post('/:post_id', checkAuth, CommentsCtrl.post)

  .patch('/:id', checkAuth, CommentsCtrl.patch)

  .delete('/:id', checkAuth, CommentsCtrl.delete);

module.exports = router;
