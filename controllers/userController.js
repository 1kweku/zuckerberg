const User = require("../models/User");

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.UserId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID" })
          : User.deleteMany({ _id: { $in: User.thoughts } })
      )
      .then(() => res.json({ message: "User and students deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  //addFriend
  addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body);
    //Updating user since friends are conencted to user
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { assignment: { UserId: req.params.UserId } } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
