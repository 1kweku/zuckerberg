const { Schema, Types } = require("mongoose");
const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

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
      validate: [validateEmail, "Please fill a valid email address"],
    },
    thoughts: [
      {
        //reference thought model
        type: Schema.types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
  userSchema.virtual("friendCount").get(() => {
    return this.friends.length;
  })
);
const user = mongoose.model("user", userSchema);

module.exports = userSchema;
