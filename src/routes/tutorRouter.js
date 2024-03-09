const express = require("express");
const router = express.Router();
// const authenticateUser = require("../middleware/authentication");

const {
    getAllTutors,
    getTutorById,
    updateTutor,
    deleteTutor,
} = require("../controllers/tutorController");

router.get("/", getAllTutors);

router
    .route("/:id")
    .get(getTutorById)
    .patch(authenticateUser, updateTutor)
    .delete(authenticateUser, deleteTutor);

module.exports = router;
