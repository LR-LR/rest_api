// Imports
const router = require('express').Router();
const checkAuth = require('../middlewares/check-auth');

// Controller
const CommentsCtrl = require('../controllers/comments');

// Routes
router.get('/', CommentsCtrl.get_all);

router.get('/:id', CommentsCtrl.get_one);

router.get('/post/:post_id', CommentsCtrl.get_one_by_post_id);

router.post('/:post_id', checkAuth, CommentsCtrl.post);

router.patch('/:id', checkAuth, CommentsCtrl.patch);

router.delete('/:id', checkAuth, CommentsCtrl.delete);

module.exports = router;
