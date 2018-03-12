const express = require('express');
const path = require('path');

const router = express.Router();

router.route('/')
  .get( (req, res) => {
    res.sendFile(path.resolve('build/index.html'));
  });

module.exports = router;
