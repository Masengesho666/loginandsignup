import User from "../models/user.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Delete user
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// Change role
export const changeRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  res.json(user);
};
