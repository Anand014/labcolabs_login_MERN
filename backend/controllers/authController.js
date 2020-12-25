const User = require("../models/userModel");
const asyncHandler = require("../middleware/async");
const generateToken = require("../utils/generatetoken");
const { validate } = require("../models/userModel");
const { Error } = require("mongoose");

// @desc    Register new User
// @route   Post /api/users
// @access Public
exports.register = asyncHandler(async (req, res) => {
  console.log(req.body, "in server");
  const { name, email, password, address, phoneNumber, date } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(403);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
      address,
      phoneNumber,
      date,
    }).catch((err) => {
      if (err.code) {
        res.status(404);
        throw new Error("Phone number is registered with other user");
      } else {
        if (err.errors.password) {
          res.status(400);
          throw new Error("Invalid User Password");
        } else if (err.errors.email) {
          res.status(401);
          throw new Error("Invalid User Email");
        } else {
          throw new Error("Please Enter a Valid Information");
        }
      }
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        date: user.date,
        token: generateToken(user._id),
      });
    }
  }
});

// @desc    Auth user & get token
// @route   Post /api/users/login
// @access Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (user) {
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(403);
      throw new Error("Password Do Not Match");
    } else if (user && isMatch) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        date: user.date,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(404);
    throw new Error("Email not Found");
  }
});
