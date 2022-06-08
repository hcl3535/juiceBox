const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db');

postsRouter.get('/', async (req, res) => {
  const allPosts = await getAllPosts()

  res.send({
    allPosts
  });
})

module.exports = postsRouter;