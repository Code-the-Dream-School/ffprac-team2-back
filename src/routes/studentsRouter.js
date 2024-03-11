const express = require("express");

const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentsController");

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', addStudent);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;