const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');
const { uploadImage } = require("../controllers/uploadImgController");

router.get('/', mainController.get);
router.post('/uploads', uploadImage);
  
module.exports = router;