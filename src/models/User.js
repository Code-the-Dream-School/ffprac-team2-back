const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Provide Your First Name"],
    maxlength: [50,"First name should not be more that 50 characters"],
    minlength: [3, "First name must be at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please Provide Your Last Name"],
    maxlength: [50, "Last name should not be more that 50 characters"],
    minlength: [3, "Last name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please Provide a Valid Email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [6, "Password must be at least 6 characters"],
    validate: {
      validator: function (password) {
        // Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(password);
      },
      message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    },
  },
  role: {
    type: String,
    enum: ["tutor", "parent"]
  }
});

// UserSchema.pre("save", async function () {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });

UserSchema.pre("save", async function (next) {
// For chaging password. Will be updated
//   if (!this.isModified("password")) {
//     return next();
//   }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createJWT = function () {
    const token = jwt.sign({ userId: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email, role: this.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
  };

module.exports = mongoose.model("User", UserSchema);
