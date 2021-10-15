/*eslint-env es6*/
const express = require('express');
const mongoose = require('mongoose');
const postRouters = require('./routers/posts');
const userRouters = require('./routers/user');

const app = express();

mongoose.connect("mongodb+srv://dell:" + process.env.MONGO_PW + "@cluster0.ttrom.mongodb.net/mean?retryWrites=true&w=majority")
  .then((data) => {
    console.log("DB connect success");
  }).catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Accept", "Content-Type", "X-Requested-With, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, PATCH");
  next();
});

app.use("/api/posts", postRouters)
app.use("/api/user", userRouters)
module.exports = app;
