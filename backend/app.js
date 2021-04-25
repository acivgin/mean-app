const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Post = require("./models/post");

mongoose
  .connect(
    "mongodb+srv://adis:LoqCMMhG6ZVmbViP@cluster0.y2ala.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, OPTIONS, DELETE"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({ title: req.body.title, content: req.body.content });

  console.log(post);
  post.save();

  res.status(201).json({
    message: "Post added successfully",
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "0984-6848-6849-6894-9868",
      title: "Post comes from server",
      content: "This is content for first post and comes from server",
    },
    {
      id: "6806-8468-6804-8460-4688",
      title: "Second Post title",
      content: "I would like to say that this post comes from server",
    },
  ];
  res.status(200).json({
    message: "Posts ftched successfully",
    posts: posts,
  });
});

module.exports = app;
