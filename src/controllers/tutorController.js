const Tutor = require("../models/Tutor");
const { StatusCodes } = require("http-status-codes");
// const { BadRequestError, NotFoundError } = require("../errors");

const getAllTutors = async (req, res) => {
    try {
        const tutors = await Tutor.find();
        res.status(StatusCodes.OK).json({ tutors });
    } catch (error) {
        console.error("Error in getAllTutors:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        });
    }
};

const getTutorById = async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id);
        if (!tutor) {
            throw new NotFoundError("Tutor not found");
        }
        res.status(StatusCodes.OK).json({ tutor });
    } catch (error) {
        console.error("Error in getTutorById:", error);
        if (error instanceof NotFoundError) {
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Internal Server Error",
            });
        }
    }
};


const updateTutor = async (req, res) => {
    try {
        const tutorId = req.params.id;
        const tutor = await Tutor.findByIdAndUpdate(tutorId, req.body, {
            new: true,
        });
        if (!tutor) {
            throw new NotFoundError("Tutor not found");
        }
        res.status(StatusCodes.OK).json({ tutor });
    } catch (error) {
        console.error("Error in updateTutor:", error);
        if (error instanceof NotFoundError) {
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Internal Server Error",
            });
        }
    }
};

const deleteTutor = async (req, res) => {
    try {
        const tutorId = req.params.id;
        const tutor = await Tutor.findByIdAndDelete(tutorId);
        if (!tutor) {
            throw new NotFoundError("Tutor not found");
        }
        res.status(StatusCodes.OK).json({
            message: "Tutor deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteTutor:", error);
        if (error instanceof NotFoundError) {
            res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
            
            
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Internal Server Error",
            });
        }
    }
};

module.exports = {
    getAllTutors,
    getTutorById,
    updateTutor,
    deleteTutor,
};
