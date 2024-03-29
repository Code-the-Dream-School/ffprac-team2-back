const Student = require("../models/Student");
const Tutor = require("../models/Tutor");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllParentStudents = async (req, res) => {
  try {
    const {
      user: { userId },
    } = req;

    const students = await Student.find({ parentId: userId })
      .populate("parentId", "firstName lastName")
      .sort("createdAt");

    res.status(StatusCodes.OK).json({
      students,
      count: students.length,
    });
  } catch (err) {
    console.error("Error in getAllParentStudents:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: studentId },
    } = req;

    const student = await Student.findOne({
      _id: studentId,
      parentId: userId,
    })
      .populate("parentId", "firstName lastName")
      .sort("createdAt");

    if (!student) {
      throw new NotFoundError(`No student with id: ${studentId}`);
    }
    res.status(StatusCodes.OK).json({ student });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const addStudent = async (req, res) => {
  try {
    req.body.parentId = req.user.userId;
    const student = await Student.create({ ...req.body });
    res
      .status(StatusCodes.CREATED)
      .json({ student, msg: "Student has been successfully added" });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const studentId = req.params.id;

    const { name, grade, tutorInfo, tutorIdToRemove } = req.body;
    if (!name && !grade && !tutorInfo && !tutorIdToRemove) {
      throw new BadRequestError("Please provide at least one value to update");
    }
    let updatedStudent;

    if (tutorIdToRemove) {
      updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $pull: { tutorInfo: { tutorId: tutorIdToRemove } } },
        { new: true }
      );
    } else {
      const student = await Student.findOne({
        _id: studentId,
        parentId: userId,
      });
      if (!student) {
        throw new NotFoundError(`No student with id: ${studentId}`);
      }

      if (tutorInfo && tutorInfo.length > 0) {
        let existingTutorInfo = student.tutorInfo.find((info) =>
          info.tutorId.equals(tutorInfo[0].tutorId)
        );

        if (existingTutorInfo) {
          for (const subject of tutorInfo[0].subjects) {
            if (!existingTutorInfo.subjects.includes(subject)) {
              existingTutorInfo.subjects.push(subject);
            }
          }
        } else {
          const tutor = await Tutor.findOne({
            _id: tutorInfo[0].tutorId,
          }).populate("userId", "firstName lastName");
          if (!tutor) {
            throw new NotFoundError(
              `No tutor with id: ${tutorInfo[0].tutorId}`
            );
          }
          tutorInfo[0].tutorName = `${tutor.userId.firstName} ${tutor.userId.lastName}`;
          student.tutorInfo.push(tutorInfo[0]);
        }
      }
      updatedStudent = await student.save();
    }

    res.status(StatusCodes.OK).json({
      student: updatedStudent,
      msg: "Student info has been successfully updated",
    });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const studentId = req.params.id;

    const student = await Student.findOneAndDelete({
      _id: studentId,
      parentId: userId,
    });

    if (!student) {
      throw new NotFoundError(`No student with id: ${studentId}`);
    }
    res
      .status(StatusCodes.OK)
      .json({ student, msg: "Student has been successfully deleted" });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

module.exports = {
  getAllParentStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
