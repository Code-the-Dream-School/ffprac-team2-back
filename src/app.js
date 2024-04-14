const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const favicon = require('express-favicon');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./src/swagger.yaml");

require('express-async-errors');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const mainRouter = require("./routes/mainRouter.js");
const authRouter = require("./routes/auth");
const studentsRouter = require("./routes/studentsRouter.js");
const tutorRouter = require("./routes/tutorRouter.js");
const sendemailRouter = require("./routes/sendemailRouter");

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(fileUpload({ useTempFiles: true }));

// routes
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/api/v1", mainRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/students", studentsRouter);

app.use("/api/v1/tutors", tutorRouter);

app.use("/api/v1/emails", sendemailRouter);

module.exports = app;
