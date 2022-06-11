const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.get('/', async (req, res) => {
  const allTags = await getAllTags()

  res.send({
    allTags
  });
})

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;

  try {
      
      // use our method to get posts by tag name from the db
      const postList = await getPostsByTagName(tagName);
      // send out an object to the client { posts: // the posts }
      
      const filteredPosts = postList.filter(post => {

          if (post.active) {
              return true;
          }

          if (req.user && post.author.id === req.user.id) {
              return true;
          }

          return false;

      });

      if (filteredPosts) {
          console.log(filteredPosts);

          res.send({ posts: filteredPosts })
      
      } else {
          next({
              name: 'ErrorGettingPostByTag',
              message: 'Cannot get posts by tag name'
          })
      }
  }
  catch ({ name, message }) {
      // forward the name and message to the error handler
      next({ name, message });

  }
});

module.exports = tagsRouter;