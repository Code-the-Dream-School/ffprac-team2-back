const mongoose = require("mongoose");

const tutorInfoSchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  subjects: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    enum: [
      "K",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ],
    required: true
  }
}, { _id: false });

const StudentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter student name"],
      trim: true,
      minlenght: [2, "Student name should be atleast 3 characters"],
      maxlength: [50, "Student name cannot exceed 50 characters"],
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "User is required"],
    // },
    // imageUrl: [{
    //   type: String,
    //   required: [true, "Please choose student image"],
    // }],
    grade: {
      type: String,
      enum: [
        "Kindergarden",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],    
    },    
    tutorInfo: [tutorInfoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentsSchema);