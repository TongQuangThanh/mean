/*eslint-env es6*/
const express = require('express');
const Post = require('./model/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://dell2:quangthanh94@cluster0.ttrom.mongodb.net/mean?retryWrites=true&w=majority")
  .then((data) => {
    console.log("DB connect success");
  }).catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Accept", "Content-Type", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, DELETE, OPTIONS, PATCH");
  next();
});

app.get("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({ message: "Added successfully" })
})
module.exports = app;