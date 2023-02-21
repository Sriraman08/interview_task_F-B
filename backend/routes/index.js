var express = require('express');
var router = express.Router();
const bookRouter = require('./books');
const journalRouter = require('./journal');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/book',bookRouter)
router.use('/journal',journalRouter)


module.exports = router;
