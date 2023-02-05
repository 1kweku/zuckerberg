const { Schema, model } = require("mongoose");
const assignmentSchema = require("./User");

// Schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Object,
      default: ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method
    },
    assignments: [assignmentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const reaction = model("reaction", reactionSchema);

module.exports = reaction;
