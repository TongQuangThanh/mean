// /api/posts
/*eslint-env es6*/
const express = require('express');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
}

const router = express.Router();
const Post = require('../model/post.model');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: url + '/images' + req.file.filename
  });
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({ message: "Added successfully", data: createdPost })
  });
})

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({ message: "Fetch all successfully", data: documents })
  });
})

router.get(":id", (req, res, next) => {
  console.log(req.body.id);
  Post.findOne({_id: req.body.id}).then(documents => {
    res.status(200).json({ message: "Fetch 1 successfully", data: documents })
  });
})

module.exports = router;