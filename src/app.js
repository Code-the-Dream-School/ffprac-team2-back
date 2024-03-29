const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const favicon = require('express-favicon');
const logger = require('morgan');

require('express-async-errors');

const mainRouter = require('./routes/mainRouter.js');
const authRouter = require('./routes/auth');
const studentsRouter = require('./routes/studentsRouter.js');
const tutorRouter = require("./routes/tutorRouter.js"); 


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

// routes
app.use('/api/v1', mainRouter);

app.use('/api/v1/auth', authRouter);

app.use("/api/v1/students", studentsRouter);

app.use("/api/v1/tutors", tutorRouter);

module.exports = app;