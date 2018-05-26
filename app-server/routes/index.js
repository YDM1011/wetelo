var express = require('express');
var router = express.Router();

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My books' });
});

module.exports = router;
