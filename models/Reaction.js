const { Schema, model } = require("mongoose");
// const userSchema = require("./User");

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
    },
  }
  // {
  //   toJSON: {
  //     getters: true,
  //   },
  // }
);

//
module.exports = reaction;
