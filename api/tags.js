const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;

  try {
    // use our method to get posts by tag name from the db
    const postListByTagName = await getPostsByTagName(tagName);

    // Only keep posts posted by the logged-in user
    const posts = postListByTagName.filter((post) => {
      return (post.active && post.author.active) || (req.user && post.author.id === req.user.id);
    });

    res.send({ post: posts });
  } catch ({ name, message }) {
    ({ name, message })
  }
});

module.exports = tagsRouter;
