const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/userController");

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/Users/:UserId
router.route("/:UserId").get(getSingleUser).delete(deleteUser).put(updateUser);

// router.route("/:UserId/assignments").post(addAssignment);

// router.route("/:UserId/assignments/:assignmentId").delete(removeAssignment);

module.exports = router;