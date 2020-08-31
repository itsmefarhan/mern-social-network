const express = require("express");
const router = express.Router();
const { requireLogin } = require("../controllers/auth");
const {
  createPost,
  newsFeed,
  userPosts,
  deletePost,
  likePost,
  unlikePost,  
} = require("../controllers/post");

router.route("/:userId").post(requireLogin, createPost);
router.route("/:postId").delete(requireLogin, deletePost);
router.route("/feed/:userId").get(requireLogin, newsFeed);
router.route("/userposts/:userId").get(requireLogin, userPosts);
router.route("/like").put(requireLogin, likePost);
router.route("/unlike").put(requireLogin, unlikePost);

module.exports = router;
