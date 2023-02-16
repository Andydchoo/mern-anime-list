import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users })
};

export const signup = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "Username already taken!" })
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    username,
    password: hashedPassword,
    list: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user })
}

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "No existing user with this username!" })
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" })
  }
  return res.status(200).json({ message: "Login Successful" });
}