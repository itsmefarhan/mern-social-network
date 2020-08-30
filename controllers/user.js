const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Register user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashed_password = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashed_password,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-password -__v")
      .populate("following", "_id name email")
      .populate("followers", "_id name email");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  // Check authorization
  // if (req.params.userId !== req.user._id) {
  //   return res.status(403).json({ message: "Access Denied" });
  // }

  try {
    // find email in db
    let check = await User.findOne({ email: req.body.email });
    // find user by params id
    let currentUser = await User.findById(req.params.userId);

    // if logged in user email = body or email in db = body
    if (currentUser.email !== req.body.email || check._id === req.body.email) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.findOneAndUpdate(req.params.userId, req.body, {
      new: true,
    }).select("-password -__v");
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  // Check authorization
  if (req.params.userId !== req.user._id) {
    return res.status(403).json({ message: "Access Denied" });
  }
  try {
    await User.findOneAndDelete(req.params.userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

exports.addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId },
    });
    // Call next to execute addFollower function
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.addFollower = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .select("-password -__v")
      .populate("following", "_id name email")
      .populate("followers", "_id name email");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.unfollowId },
      // Call next to execute removeFollower function
    });
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.removeFollower = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.unfollowId,
      {
        $pull: { followers: req.body.userId },
      },
      { new: true }
    )
      .select("-password -__v")
      .populate("following", "_id name email")
      .populate("followers", "_id name email");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Find people to follow
exports.findPeopleToFollow = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    // Push logged in user into his own following list
    user.following.push(user._id)
    let users = await User.find({ _id: { $nin: user.following } }).select('-password -__v');    
    res.json(users);
  } catch (err) {
    console.log(err.message);
  }
};
