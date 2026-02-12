import Name from "../models/names.model.js";

// GET all names
export const getNames = async (req, res) => {
  const names = await Name.find();
  res.json(names);
};

// GET single name
export const getName = async (req, res) => {
  const name = await Name.findById(req.params.id);
  if (!name) return res.status(404).json({ message: "Name not found" });
  res.json(name);
};

// CREATE name
export const createName = async (req, res) => {
  const newName = await Name.create(req.body);
  res.status(201).json(newName);
};

// UPDATE name
export const updateName = async (req, res) => {
  const updated = await Name.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Name not found" });
  res.json(updated);
};

// DELETE name
export const deleteName = async (req, res) => {
  const deleted = await Name.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Name not found" });
  res.json({ message: "Deleted successfully" });
};
