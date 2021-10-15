// /api/user
/*eslint-env es6*/
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../model/user.model');
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

router.post("signup", (req, res, next) => {
  bcrypt.hash(req.body.password).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    })
    user.save().then(createdUser => {
      console.log(createdUser);
      res.status(201).json({ message: "Signup successfully", data: createdUser })
    });
  });
});

router.post("login", (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    let fetchUser;
    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      })
    }
    fetchUser = user;
    return bcrypt.compare(req.body.password, user.password)
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign({ email: fetchUser.email, userId: fetchUser._id }, process.env.JWT_ENV, { expiresIn: '1h' });
    res.status(200).json({ token: token, expiresIn: 3600, userId: fetchUser._id })
  }).catch(err => {
    return res.status(401).json({
      message: 'Auth failed',
      data: err
    });
  })
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({ message: "Fetch all successfully", data: documents })
  });
});

router.get(":id", (req, res, next) => {
  console.log(req.body.id);
  Post.findOne({ _id: req.body.id }).then(documents => {
    res.status(200).json({ message: "Fetch 1 successfully", data: documents })
  });
});

module.exports = router;