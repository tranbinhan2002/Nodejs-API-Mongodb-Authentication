const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
  editValidation,
} = require("../validation/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
const register = async function (req, res) {
  //checking value input
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking Email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist ");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

//Login
const login = async function (req, res) {
  //checking value input
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking Email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  //password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //create and assign a token
  const token = jwt.sign({ name: user.name }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({token, massage: "Login successful "});
};

//Select
const indexUser = async function (req, res) {
  try {
    const user = await User.find();
    if (!user) throw Error("No items!");
    {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//Edit
const editUser = async function (req, res) {
  //checking value input
  const { error } = editValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      password: hashPassword,
    });
    if (!user) throw Error("Something went wrong while updating!");
    {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

//Delete
const deleteUser = async function (req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw Error("Not post found!");
    {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
module.exports = {
  register,
  login,
  indexUser,
  editUser,
  deleteUser,
};
