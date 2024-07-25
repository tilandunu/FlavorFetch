const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BlogModel = require("./models/Blogs");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://tilandunu:1234@cluster0.kacglu2.mongodb.net/blogHub?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/viewBlog", (req, res) => {
  const userId = req.query.userId;
  BlogModel.find({ userId })
    .then((blogs) => res.json(blogs))
    .catch((err) => res.json(err));
});

app.post("/createBlog", (req, res) => {
  BlogModel.create(req.body)
    .then((blogs) => res.json(blogs))
    .catch((err) => res.json(err));
});

app.put("/updateBlog/:id", (req, res) => {
  const id = req.params.id;
  BlogModel.findByIdAndUpdate(
    { _id: id },
    {
      uid: req.body.userId,
      title: req.body.title,
      subTitle: req.body.subTitle,
      content: req.body.content,
    }
  )
    .then((blogs) => res.json(blogs))
    .catch((err) => res.json(err));
});

app.get("/getBlog/:id", (req, res) => {
  const id = req.params.id;
  BlogModel.findById({ _id: id })
    .then((blogs) => res.json(blogs))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});

app.delete("/deleteBlog/:id", (req, res) => {
  const id = req.params.id;
  BlogModel.findByIdAndDelete({ _id: id })
    .then((blogs) => res.json(blogs))
    .catch((err) => res.json(err));
});
