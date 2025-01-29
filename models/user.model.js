const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Name must be unique"],
    },
    email: {
      type: String,
      required: [true, "Email must be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be unique"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);

module.exports = model("User", userSchema);
