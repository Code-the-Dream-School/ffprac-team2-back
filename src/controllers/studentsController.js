const Student = require("../models/Student");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllStudents = async (req, res) => {
   const students = await Student.find().sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ students, count: students.length });
};

const getStudentById = async (req, res) => {
  const {
    params: { id: studentId },
  } = req;
  const student = await Student.findOne({
    _id: studentId,
  });
  if (!student) {
    throw new NotFoundError(`No student with id: ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
};

const addStudent = async (req, res) => {
  // req.body.createdBy = req.user.userId;
  const student = await Student.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ student,  msg: "Student has been successfully added" });
};

const updateStudent = async (req, res) => {
  try {
    // const userId = req.user.userId;
    const studentId = req.params.id;
    
    const { name, grade } = req.body;

    if (!name || !grade) {
      throw new BadRequestError("Please provide all values");
    }

    const student = await Student.findOneAndUpdate(
      { _id: studentId },
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
    // const userId = req.user.userId;
    const studentId = req.params.id;
   
    const student = await Student.findOneAndDelete(
      { _id: studentId },    
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
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};