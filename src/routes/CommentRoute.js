const express = require("express");
const route = express.Router();
const CommentController = require("../controller/CommentController");
route.get("/:movie_id",CommentController.getByMovieId);
route.post("/",CommentController.addComment);
route.delete("/:comment_id",CommentController.deleteComment);
module.exports = route;