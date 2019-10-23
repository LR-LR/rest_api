// Imports
const router = require('express').Router();
const checkAuth = require('../middlewares/check-auth');

// Controller
const UsersCtrl = require('../controllers/users');

// Routes
router.get('/', UsersCtrl.get_all);

router.get('/:id', UsersCtrl.get_one);

router.post('/signup', UsersCtrl.signup);

router.post('/login', UsersCtrl.login);

router.patch('/:id', checkAuth, UsersCtrl.patch);

router.delete('/:id', checkAuth, UsersCtrl.delete);

module.exports = router;
