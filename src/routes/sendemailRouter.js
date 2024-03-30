const express = require("express");
const router = express.Router();
const sendemailController = require("../controllers/sendemailController");
// const auth = require("../middleware/authentication");

router.post("/send/:tutorId", sendemailController);

module.exports = router;
