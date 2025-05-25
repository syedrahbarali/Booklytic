const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    console.log("Authentication Started");
    const token =
      req.cookies.accessToken ||
      req.header("Authorization").replace("Bearer ", "");

    console.log(token);

    const decoded = jwt.verify(token, `${process.env.JWT_ACCESS_TOKEN_SECRET}`);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    console.log("Token is Valid");
    req.body = { ...req.body, ...decoded };
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Please authenticate" });
  }
};
