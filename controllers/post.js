const User = require("../models/user");
const Post = require("../models/post");

// Create post
exports.createPost = async (req, res) => {
  try {
    let post = new Post(req.body);
    post.postedBy = req.user._id;
    await post.save();
    return res.json(post);
  } catch (err) {
    console.log(err);
  }
};

// NewsFeed posts
exports.newsFeed = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    // Push logged in user into his own following list
    user.following.push(user._id);
    const posts = await Post.find({ postedBy: { $in: user.following } })
      .populate("postedBy", "_id name")
      .sort("-createdAt");
    res.json(posts);
  } catch (err) {
    console.log(err.message);
  }
};

// Posts by user
exports.userPosts = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.params.userId })
      .populate("postedBy", "_id name")
      .sort("-createdAt");
    res.json(posts);
  } catch (err) {
    console.log(err.message);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.postedBy._id.toString() !== req.user._id) {
      return res.status(403).json({ message: "Access Denied" });
    }
    await post.remove();
    res.json({ message: "Post delete successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

exports.likePost = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.body.userId },
      },
      { new: true }
    );

    return res.json(result);
  } catch (err) {
    console.log(err.message);
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.body.userId },
      },
      { new: true }
    );

    return res.json(result);
  } catch (err) {
    console.log(err.message);
  }
};
