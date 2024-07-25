const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  uid: String,
  title: String,
  subTitle: String,
  content: String,
});

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;
