const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  details:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  }
},   { timestamps: true });

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
