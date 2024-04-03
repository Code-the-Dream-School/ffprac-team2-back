const mongoose = require("mongoose");

const tutorInfoSchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  tutorName: {
    type: String,
  },
  subject: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    required: true
},
}, { _id: false });

const StudentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter student name"],
      trim: true,
      minlenght: [2, "Student name should be at least 3 characters"],
      maxlength: [50, "Student name cannot exceed 50 characters"],
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    image: {
      type: String,
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
    },    
    tutorInfo: [tutorInfoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentsSchema);