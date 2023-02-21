var express = require('express');
var router = express.Router();
const multer = require('multer');
const bookController = require('../controller/books.controller');

var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads/book');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});
var upload = multer({ storage: storage }).single("book_image");


router.post('/',upload,bookController.create)
router.get('/',bookController.list)
router.get('/graph_count',bookController.graphData)



module.exports = router;
