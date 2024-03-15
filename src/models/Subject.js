const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    subject: {
        type: String,
        enum: [
            "English",
            "Foreign Languages",
            "Math",
            "Science",
            "Social Studies",
        ],
    },
    className: {
        English: [{ // Added englishSubjects under English category
            type: String,
            enum: [
                "English",
                "ESL",
                "Poetry",
                "Literacy",
                "Reading",
                "Writing",
                "ACT English Test Prep",
                "ACT Reading Test Prep",
                "SAT Writing Test Prep",
                "ACT Writing Test Prep",
            ],
        }],
        ForeignLanguages:[{
            type: String,
            enum: [
                "Spanish", 
                "French", 
                "Chineese", 
                "German", 
                "Latin"
            ]
        }],
        Math: {
            type: [String],
            enum: [
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
        Science: [{ // Added scienceSubjects under Science category
            type: String,
            enum: [
                "Biology",
                "Chemistry",
                "Earth Science",
                "Physics",
                "Science",
                "ACT Science Test Prep",
            ],
        }],
        
        SocialStudies: [{ // Added scienceSubjects under Social Studies category
            type: String,
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
        }],
    },
});

module.exports = mongoose.model("Subject", SubjectSchema);
