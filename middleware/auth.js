const expressJwt = require("express-jwt");
const User = require("../model/user");

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.admin = async (req, res, next) => {
  const admin = await User.findById(req.user._id);
  console.log(admin.isAdmin);
  if (admin.isAdmin === true) {
    next();
  } else {
    res.status(401);
    throw new Error("Vous n'êtes autorisé à acceder");
  }
};
