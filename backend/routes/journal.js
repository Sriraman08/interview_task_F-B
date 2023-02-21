var express = require('express');
var router = express.Router();
const multer = require('multer');
const journalController = require('../controller/journal.controller');

var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads/journal');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});
var upload = multer({ storage: storage }).single("journal_image");


router.post('/',upload,journalController.create)
router.get('/',journalController.list)


module.exports = router;
