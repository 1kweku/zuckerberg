const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    // reactions: [
    //   {
    //     type: Schema.types.ObjectId,
    //     ref: "reaction",
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
  thoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length;
  })
);

const thought = mongoose.model("thought", thoughtSchema);

module.exports = thought;
