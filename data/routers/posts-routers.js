const express = require("express");
const db = require("../db");
//const comments = require("../db");

const router = express.Router();

// GET request

router.get("/api/posts", (req, res) => {
  db
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
  db
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "post with this ID  not found",
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


// POST request

router.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  db
    .insert({ title, contents })
    .then((post) => {
      res.status(201).json({
        message: " new post created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Error retrieving the posts with this ID `,
      });
    });
});



module.exports = router;
