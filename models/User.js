const { Schema, Types } = require("mongoose");

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //matching validation,
    },
    thoughts: {
      type: Date,
      default: Date.now,
    },
    friends: {},
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = userSchema;
