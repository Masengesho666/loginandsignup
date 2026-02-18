import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
  process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

  res.json({
    message: "Login success",
    token
  });
};
export default login;
