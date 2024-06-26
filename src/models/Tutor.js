const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    ForeignLanguages: {
        type: [String],
        enum: ["Spanish", "French", "Chinese", "German", "Latin"],
    },

    MathSubject: {
        type: [String],
        enum: [
            "Math",
            "Algebra",
            "Geometry",
            "Trigonometry",
            "Calculus",
            "Statistics",
            "Pre-Calculus",
            "SAT Math Test Prep",
            "ACT Math Test Prep",
        ],
    },

    Science: {
        type: [String],
        enum: [
            "Biology",
            "Chemistry",
            "Earth Science",
            "Physics",
            "Science",
            "ACT Science Test Prep",
        ],
    },

    SocialStudies: {
        type: [String],
        enum: [
            "World History",
            "Psychology",
            "US Government",
            "Social Science",
            "US History",
            "Political Science",
            "Geography",
            "European History",
        ],
    },

    English: {
        type: [String],
        enum: [
            "Writing",
            "Reading",
            "ESL",
            "Poetry",
            "Literacy",
            "ACT English Test Prep",
            "ACT Reading Test Prep",
            "ACT Writing Test Prep",
        ],
    },

    education: {
        type: String,
    },

    avatar: {
        type: String,
    },

    about: {
        type: String,
    },

    grades: {
        type: [String],
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

    yearsOfExperience: {
        type: Number,
        min: 1,
        max: 50,
    },

    availability: {
        type: [String],
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
    },
});

module.exports = mongoose.model("Tutor", TutorSchema);
