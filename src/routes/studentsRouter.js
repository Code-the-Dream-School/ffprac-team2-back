const express = require("express");
const authMiddleware = require("../middleware/authentication");
const isParentMiddleware  = require("../middleware/isParent");

const router = express.Router();

const {
  getAllParentStudents,
  getAllTutorStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsController");

router.get('/', authMiddleware, isParentMiddleware, getAllParentStudents);
router.get('/my-students', authMiddleware, getAllTutorStudents);
router.get('/:id', authMiddleware, isParentMiddleware, getStudentById);
router.post('/', authMiddleware, isParentMiddleware, addStudent);
router.patch('/:id', authMiddleware, isParentMiddleware, updateStudent);
router.delete('/:id', authMiddleware, isParentMiddleware, deleteStudent);


module.exports = router;