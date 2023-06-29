const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://divyansh_gabra:6kGkgjrr2N9LPOGr@cluster0.h5vocpi.mongodb.net/BlogDB",
  { useNewUrlParser: true }
);

app.set("view engine", "ejs");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = `Welcome to our online journal, a digital space for self-exploration, connection, and growth. Our journal is a platform for individuals who seek to delve deeper into their thoughts, feelings, and experiences. Here, you will find a collection of stories, insights, and perspectives from a diverse group of contributors. Our goal is to provide a space where readers can connect with themselves and others, find inspiration, and gain a deeper understanding of themselves and the world around them.
We believe that everyone has a unique story to tell, and that sharing our stories can help us connect with each other and find meaning in our lives. Our journal is a space where individuals can share their personal journeys, struggles, and triumphs.
`;

const aboutContent = `I am Divyansh Gabra from Gwalior, Madhya Pradesh, India. Currently I am pursuing B.Tech from VIT Bhopal. I am currently learning how to develop and design websites and web applications.This Daily Journal is a part of the list of projects I am going to make during this course. I hope everyone has a great time using the "Daily Journal".
`;

const contactContent =
  "Got a question or want to share your thoughts? We'd love to hear from you! Contact us through our website or email, and our friendly team will get back to you promptly. Let's connect and make your journaling experience even better!";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blog", (req, res) => {
  Post.find({})
    .then(function (post) {
      res.render("blog", { homeStarting: homeStartingContent, posts: post });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  const title = req.body.title;
  const content = req.body.post;

  const newPost = new Post({
    title: title,
    content: content,
  });

  newPost
    .save()
    .then(function (post) {
      res.redirect("/blog");
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/posts/:postId", function (req, res) {
  const reqId = req.params.postId;
  Post.findOne({ _id: reqId })
    .then(function (post) {
      const storeTitle = post.title;
      const storeContent = post.content;
      res.render("post", {
        openPost: storeTitle,
        openContent: storeContent,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
