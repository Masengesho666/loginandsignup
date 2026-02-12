import mongoose from "mongoose";

const nameSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String
    },

    // Who created this name
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  },
  { timestamps: true }
);

export default mongoose.model("Name", nameSchema);
