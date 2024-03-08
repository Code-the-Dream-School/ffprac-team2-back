const Student = require("../models/Student");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getStudentsProducts = async (req, res) => {};

const getStudentById = async (req, res) => {};

const addStudent = async (req, res) => {
  // req.body.createdBy = req.user.userId;
  const student = await Student.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ student,  msg: "Student has been successfully added" });
};

const updateStudent = async (req, res) => {};

const deleteStudent = async (req, res) => {};

module.exports = {
  getStudentsProducts,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};