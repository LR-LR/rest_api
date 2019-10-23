// Imports
const router = require('express').Router();
const checkAuth = require('../middlewares/check-auth');

// Controller
const UsersCtrl = require('../controllers/users');

// Routes
router
  .get('/', UsersCtrl.get_all)

  .get('/:id', UsersCtrl.get_one)

  .post('/signup', UsersCtrl.signup)

  .post('/login', UsersCtrl.login)

  .patch('/:id', checkAuth, UsersCtrl.patch)

  .delete('/:id', checkAuth, UsersCtrl.delete);

module.exports = router;
