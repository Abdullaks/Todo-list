const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please Add a name"],
    },
    email: {
      type: String,
      required: [true, "please Add an email"],
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "please Add a phone number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please Add a password"],
    },
    role: {
      type: String,
      enuum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.email == "admin123@gmail.com") {
    this.role = "admin";
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
