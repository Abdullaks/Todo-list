const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//desc Register new User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    res.status(400);
    throw new Error("Please add all Fields");
  }
  //check user Exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Alredy Exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//desc Authenticate User
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//desc get User Data
//@route GET /api/users/me
//@access Public
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    email,
    name,
  });
  // res.json({message:"User data display"})
});

//jwt token generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//find user
const findUsers = asyncHandler(async (req, res) => {
  const user = await User.find({}).skip(1);
  res.json(user);
});

const findOneuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  // console.log('backenddd');
  const { id } = req.params;
  const userDelete = await User.findByIdAndDelete(id);
  res.json({ id });
});

const editUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const editUser = await User.findByIdAndUpdate(id, req.body);
  res.json(editUser);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  findUsers,
  findOneuser,
  deleteUser,
  editUser,
};
