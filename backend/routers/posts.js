/*eslint-env es6*/
const express = require('express');
const Post = require('../model/post.model');
const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({ message: "Added successfully" });
  });
})

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    console.log('get', documents);
    res.status(201).json({ message: "Added successfully", data: documents });
  });
})

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.title,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(documents => {
    console.log('get', documents);
    res.status(201).json({ message: "Edit successfully", data: documents });
  });
})

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(results => {
    console.log('delete', req.params.id);
    res.status(201).json({ message: "Delete successfully", data: results });
  });
})

module.exports = router
