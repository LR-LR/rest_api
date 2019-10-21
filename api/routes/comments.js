const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /comments'
  });
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: `Handling GET request to /comments with an ID`,
    id: req.params.id
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST request to /comments'
  });
});

router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: `Handling PATCH request to /comments with an ID`,
    id: req.params.id
  });
});

router.put('/:id', (req, res, next) => {
  res.status(200).json({
    message: `Handling PUT request to /comments with an ID`,
    id: req.params.id
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Handling DELETE request to /comments with an ID',
    id: req.params.id
  });
});

module.exports = router;
