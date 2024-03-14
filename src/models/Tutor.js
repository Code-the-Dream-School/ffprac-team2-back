const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    // subjectId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Subject",
    //     required: true,
    // },

    education: {
        type: String,
    },
    
    about: {
        type: String,
    },
    
    grades:[{
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
    }],
    
            
    yearsOfExperience: {
        type: Number,
        min: 1,
        max: 50,
    },
    
    availability: [{
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
    }],
});


module.exports = mongoose.model("Tutor", TutorSchema);
