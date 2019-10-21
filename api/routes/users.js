// Imports
const router = require('express').Router();

// Controller
const UsersCtrl = require('../controllers/users');

// Routes
router.get('/', UsersCtrl.get_all);

router.get('/:id', UsersCtrl.get_one);

router.post('/signup', UsersCtrl.signup);

router.patch('/:id', UsersCtrl.patch);

router.delete('/:id', UsersCtrl.delete);

module.exports = router;
