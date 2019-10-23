// Imports
const router = require('express').Router();
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

// Multer configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Incorrect file type'), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// Controller
const PostCtrl = require('../controllers/posts');

router
  .get('/', PostCtrl.get_all)

  .get('/:id', PostCtrl.get_one)

  .post('/', checkAuth, upload.single('image'), PostCtrl.post)

  .patch('/:id', checkAuth, PostCtrl.patch)

  .delete('/:id', checkAuth, PostCtrl.delete);

module.exports = router;
