const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  // console.log("name: ", user.firstName, user.lastName, user.email, user.role);
  const token = user.createJWT();
  console.log("token ", token);
  res.status(StatusCodes.CREATED).json({ user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new BadRequestError("Please provide password, and email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("The access is not authorised");
  }

  const isPasswordCorrect =await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("The access is not authorised");
  } 

  //comparing password
  const token = user.createJWT();
  // console.log("userId ", user._id, user.firstName, user.lastName, user.email, user.role);
  res.status(StatusCodes.CREATED).json({ user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, token });
};

module.exports = {
  register,
  login,
};