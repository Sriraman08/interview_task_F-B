const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  journals: {
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


const journal = mongoose.model("journal", journalSchema);

module.exports = journal;