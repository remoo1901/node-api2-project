const express = require("express");
const db = require("../db");

const router = express.Router();

// GET request

router.get("/api/posts/:id/comments", (req, res) => {
  db.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "post with this ID  not found",
        });
      } else {
        db.findCommentById(req.params.id).then((comment) => {
          res.status(200).json(comment);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "post with this ID  not found",
      });
    });
});

// POST request

router.post("/api/posts/:id/comments", (req, res) => {
  const comment = { ...req.body, post_id: req.params.id };

  if (!req.params.id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "Please provide text for the comment.",
    });
  } else {
    db.insertComment(comment)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "post with this ID  not found",
      });
    });
  }
  
});

module.exports = router;

 