const express = require("express");
const posts = require("../db");
const comments = require("../db");

const router = express.Router();

// GET request

router.get("/api/posts", (req, res) => {
  posts
    .find({
      sortBy: req.query.sort,
      limit: req.query.limit,
    })
    .then((posts) => {
      res.status(200).json(posts);
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post.id) {
        res.status(200).json(post);
      } else if (!post.id) {
        res.status(404).json({
          message: `post with this ID  not found`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Error retrieving the posts with this ID `,
      });
    });
});

module.exports = router;
