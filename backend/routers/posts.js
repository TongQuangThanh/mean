// /api/posts
/*eslint-env es6*/
const express = require('express');
const checkAuth = require('./middleware/check-auth');
const extractFile = require('./middleware/file');

const router = express.Router();
const Post = require('../model/post.model');

router.post("", checkAuth, extractFile, (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images' + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({ message: "Added successfully", data: createdPost })
  });
})

router.put("/:id", checkAuth, extractFile, (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images' + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Update successfully!' });
    } else {
      res.status(401).json({ message: 'Not authorization' });
    }
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({ message: "Fetch all successfully", data: documents })
  });
});

router.get("/:id", (req, res, next) => {
  console.log(req.body.id);
  Post.findOne({ _id: req.body.id }).then(documents => {
    res.status(200).json({ message: "Fetch 1 successfully", data: documents })
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  console.log(req.body.id);
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Delete successfully!' });
    } else {
      res.status(401).json({ message: 'Not authorization' });
    }
  });
});

module.exports = router;