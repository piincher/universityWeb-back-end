const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../model/user");
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  //validation
  if (!name) {
    return res.json({
      error: "name should be provide",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "word is required and should be 6 character long",
    });
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({ error: "email is taken " });
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword });
  try {
    await user.save();
    //console.log('register user', user);
    return res.json({
      ok: true,
    });
  } catch (error) {
    console.log("register failed ", error);
    res.status(400).send("error try again");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "email and password incorrect" });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "email and password incorrect" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("try again ");
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ ok: true, user });
  } catch (error) {
    console.log(error);
    res.status(400).send("error not authorize");
  }
};

console.log(process.env.JWT_SECRET);
