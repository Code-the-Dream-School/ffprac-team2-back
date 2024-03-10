const express = require("express");
const router = express.Router();

const { login, register, empt } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/empt", empt);

module.exports = router;