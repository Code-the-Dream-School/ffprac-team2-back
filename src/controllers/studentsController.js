const Student = require("../models/Student");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllParentStudents = async (req, res) => {
  const {
    user: { userId },   
  } = req;
   const students = await Student.find({ parentId: userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ students, count: students.length });
};

const getStudentById = async (req, res) => {
  const {
    user: { userId },
    params: { id: studentId },
  } = req;
  const student = await Student.findOne({
    _id: studentId, parentId: userId
  });
  if (!student) {
    throw new NotFoundError(`No student with id: ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
};

const addStudent = async (req, res) => {
  req.body.parentId = req.user.userId;
  const student = await Student.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ student,  msg: "Student has been successfully added" });
};

const updateStudent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const studentId = req.params.id;
    
    const { name, grade } = req.body;

    if (!name || !grade) {
      throw new BadRequestError("Please provide all values");
    }

    const student = await Student.findOneAndUpdate(
      { _id: studentId, parentId: userId},
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      throw new NotFoundError(`No student with id: ${studentId}`);
    }
    res.status(StatusCodes.OK).json({ student, msg: "Student info has been successfully updated" });   
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const studentId = req.params.id;
   
    const student = await Student.findOneAndDelete(
      { _id: studentId, parentId: userId},
    );

    if (!student) {
      throw new NotFoundError(`No student with id: ${studentId}`);
    }
    res.status(StatusCodes.OK).json({ student, msg: "Student has been successfully deleted" });   
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
  deleteStudent
};