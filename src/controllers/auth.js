const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT(); 
    res.status(StatusCodes.CREATED).json({ user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Email already in use";
    }
    console.error("Error during registration", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  } 
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new BadRequestError("Please provide password, and email");
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
  
    const isPasswordCorrect =await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    } 
  
    //comparing password
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error("Error during login", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }  
};

module.exports = {
  register,
  login,
};