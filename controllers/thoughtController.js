// ObjectId() method for converting ThoughtId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { Thought, Course } = require("../models");

// TODO: Create an aggregate function to get the number of Thoughts overall
const headCount = async () =>
  Thought.aggregate()
    // Your code here
    .then((numberOfThoughts) => numberOfThoughts);

// Execute the aggregate method on the Thought model and calculate the overall grade by using the $avg operator
const grade = async (ThoughtId) =>
  Thought.aggregate([
    // TODO: Ensure we include only the Thought who can match the given ObjectId using the $match operator
    {
      // Your code here
    },
    {
      $unwind: "$assignments",
    },
    // TODO: Group information for the Thought with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
      // Your code here
    },
  ]);

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (Thoughts) => {
        const ThoughtObj = {
          Thoughts,
          headCount: await headCount(),
        };
        return res.json(ThoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.ThoughtId })
      .select("-__v")
      .lean()
      .then(async (Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json({
              Thought,
              grade: await grade(req.params.ThoughtId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Thought and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.ThoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No such Thought exists" })
          : Course.findOneAndUpdate(
              { Thoughts: req.params.ThoughtId },
              { $pull: { Thoughts: req.params.ThoughtId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: "Thought deleted, but no courses found",
            })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a Thought
  addAssignment(req, res) {
    console.log("You are adding an assignment");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: "No Thought found with that ID :(" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a Thought
  removeAssignment(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: "No Thought found with that ID :(" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
