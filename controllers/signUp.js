const User = require("../models/userData");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // check all inputs all are valid
    if (!name || !email || !password) {
      return res.status(406).json({
        message: "please fill the all inputs fields",
      });
    }
    // Existing user check exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    // hashed user password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        messsage: "something went wrong",
      });
    }

    // now create user
    const newUser = await User.create({
      name,
      email,
      password:hashedPassword,
      role,
    });
    res.status(200).json({
      succes: true,
      message: "user created succesfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed to creating user",
      data: "internal error",
    });
  }
};
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check all inputs all are valid
    if ((!email, !password)) {
      return res.status(406).json({
        message: "please fill the all inputs fields",
      });
    }
    // Existing user check usr is available
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }
    // Unhashed user password
    if (await bcrypt.compare(password, existingUser.password)) {
      return res.status(200).json({
        message: "login successful",
        data: existingUser,
      });
    } else {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed to logging",
      data: "internal error",
    });
  }
};
