import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  profilePicture: { type: String },
  isVerified: { type: Boolean, required: true }
}, { timestamps: true });

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
