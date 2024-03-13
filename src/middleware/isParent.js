const { ForbiddenError } = require("../errors");
const User = require("../models/User");

const isParentMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById({ _id: userId});
    
    if (user && user.role === "parent") {
      next();
    } else {
      throw new ForbiddenError("Access denied. User is not a parent.");
    }
  } catch (error) {}
};

module.exports = isParentMiddleware;