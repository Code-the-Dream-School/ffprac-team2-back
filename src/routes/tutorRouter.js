const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const {
    getAllTutors,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor,
} = require("../controllers/tutorController");

router.route("/").get(getAllTutors).post(authenticateUser, createTutor);

router
    .route("/:id")
    .get(getTutorById)
    .patch(authenticateUser,  updateTutor)
    .delete(authenticateUser,  deleteTutor);


module.exports = router;
