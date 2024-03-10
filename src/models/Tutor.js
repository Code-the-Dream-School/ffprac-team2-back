const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    education: {
        type: String,
    },
    
    about: {
        type: String,
    },
    
    grades:[{
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
    }],
    
    mathSubjects: [{
        type: String,
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
    }],
    
    scienceSubjects: [{
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
        
    englishSubjects:[{
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
    
    socialstudiesSubjects: [{
        type: String,
        enum: [
            "World History",
            "Pychology",
                "US Goverment",
                "Social Science",
                "US History",
                "Political Science",
                "Georgraphy",
                "European History",
            ],
    }],
    
    foreignlangSubjects:[ {
        type: String,
        enum: ["Spanish", "French", "Chineese", "German", "Latin"],
    }],
            
    yearsOfExperience: {
        type: Number,
        min: 1,
        max: 50,
    },
    
    availability: [{
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
    }],
});


module.exports = mongoose.model("Tutor", TutorSchema);
