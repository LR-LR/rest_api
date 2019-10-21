// Imports
const router = require('express').Router();
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
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

router.get('/', PostCtrl.get_all);

router.get('/:id', PostCtrl.get_one);

router.post('/', upload.single('image'), PostCtrl.post);

router.patch('/:id', PostCtrl.patch);

router.delete('/:id', PostCtrl.delete);

module.exports = router;
