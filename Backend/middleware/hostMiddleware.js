const User = require("../models/User");

const hostMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "host") {
      return res.status(403).json({
        message: "Only hosts are allowed to perform this action",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = hostMiddleware;
