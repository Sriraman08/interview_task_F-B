const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  books: {
    type: String,
    unique: true
  },  
  size:{
    type: String,
  },
  image_type:{
    type: String,
  },
  path:{
    type: String,
  }
},{ timestamps: true });


const book = mongoose.model("book", bookSchema);

module.exports = book;