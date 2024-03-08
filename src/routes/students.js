const express = require("express");

const router = express.Router();

const {
  getStudentsProducts,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/students");

router.get('/', getStudentsProducts);
router.get('/:id', getStudentById);
router.post('/', addStudent);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;