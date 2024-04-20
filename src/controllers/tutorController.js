const Tutor = require("../models/Tutor");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTutorsBySubject = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const search = [new RegExp(req.query.subject, "i")];
        if (!req.query.subject) {
            return res
                .status(400)
                .json({ error: "A subject query parameter is required." });
        }
        const tutors = await Tutor.find({
            $or: [
                { English: { $in: search } },
                { MathSubject: { $in: search } },
                { ForeignLanguages: { $in: search } },
                { Science: { $in: search } },
                { SocialStudies: { $in: search } },
            ],
        })
            .populate({
                path: "userId",
                select: "firstName lastName email",
            })
            // .sort({ yearsOfExperience: -1 })
            .skip(skip)
            .limit(limit);
        
        res.status(StatusCodes.OK).json({ tutors });
    } catch (error) {
        console.error("Error in getAllTutorsBySearch:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        });
    }
};

const getAllTutors = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        let subjectsFilter = {};
        if (req.query.subjects) {
            const subjects = req.query.subjects.split(",");
            subjectsFilter = {
                $or: [
                    { MathSubject: { $in: subjects } },
                    { English: { $in: subjects } },
                    { Science: { $in: subjects } },
                    { ForeignLanguages: { $in: subjects } },
                    { SocialStudies: { $in: subjects } },
                ],
            };
        }

        const tutors = await Tutor.find(subjectsFilter)
            .populate({
                path: "userId",
                select: "firstName lastName email",
            })
            .select(
                "grades about yearsOfExperience availability education avatar ForeignLanguages Science MathSubject SocialStudies English"
            )
            .skip(skip)
            .limit(limit);

        const tutorCount = await Tutor.countDocuments({});

        console.log(tutors);
        console.log("Total number of tutors:", tutorCount);
        console.log("Current page:", page);
        console.log("Tutors per page:", limit);

        res.status(StatusCodes.OK).json({
            tutors,
            tutorCount,
            currentPage: page,
            tutorsPerPage: limit,
        });
    } catch (error) {
        console.error("Error in getAllTutors:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        });
    }
};

const getMyProfile = async (req, res) => {
    try{
        const {
            user: { userId },
          } = req;
          console.log(userId);
          const tutor= await Tutor.findOne({ userId: userId });
          if (!tutor) {
            throw new NotFoundError(`This user has no tutor: ${userId}`);
          }
          res.status(StatusCodes.OK).json({ tutor});
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error" + e.message,
        });
    }
  }

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

const createTutor = async (req, res) => {
    try {
        req.body.userId = req.user.userId;

        const tutor = await Tutor.findOne({ userId: req.user.userId });
        if (tutor) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "User already has a tutor",
            });
        } else {
            const tutor = await Tutor.create({ ...req.body });
            res.status(StatusCodes.CREATED).json({ tutor });
        }
        console.log("UserID:", req.user.userId);
        // const tutor = await Tutor.create({ ...req.body });
        // res.status(StatusCodes.CREATED).json({ tutor });
    } catch (error) {
        console.error("Error in createTutor:", error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const updateTutor = async (req, res) => {
    try {
        const tutorId = req.params.id;
        const userId = req.user.userId;

        const tutor = await Tutor.findOneAndUpdate(
            { _id: tutorId, userId: userId },
            req.body,
            {
                new: true,
            }
        );
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
    createTutor,
    updateTutor,
    deleteTutor,
    getAllTutorsBySubject,
    getMyProfile
};
