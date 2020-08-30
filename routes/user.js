const express = require("express");
const router = express.Router();
const {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeopleToFollow
} = require("../controllers/user");
const { validateRegister, validationErrors } = require("../validators/auth");
const { requireLogin } = require("../controllers/auth");

router.route("/follow").put(requireLogin, addFollowing, addFollower);
router.route("/unfollow").put(requireLogin, removeFollowing, removeFollower);

router.route('/find').get(requireLogin, findPeopleToFollow)

router
  .route("/:userId")
  .get(getUser)
  .put(requireLogin, updateUser)
  .delete(requireLogin, deleteUser);

router
  .route("/")
  .post(validateRegister, validationErrors, register)
  .get(getUsers);

module.exports = router;
