const express = require("express");
const db = require("../db");

const router = express.Router();

// GET request

router.get("/api/posts/:id/comments", (req, res) => {
    db.findById(req.params.id)
    .then ((post) => {
        if (!post) {
            res.status(404).json({
                message: "post with this ID  not found",
            })
        } else {
            db.findCommentById(req.params.id)
        .then((comment) => {
          res.status(200).json(comment)
        })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "post with this ID  not found",
          })
    })
  });



  // POST request


  router.post("/api/posts/:id/comments", (req, res) => {
    db
      .findById(req.params.id)
      .then((post) => {
        if (!post) {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        }
  
        if (!req.body.text) {
          res.status(400).json({
            errorMessage: "Please provide text for the comment.",
          });
        }
  
        db.insertComment({
          text: req.params.text,
          post_id: req.body.post_id,
        });
        if (comment) {
          res.status(201).json(comment);
        }
      })
  
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
        });
      });
  });

module.exports = router;
