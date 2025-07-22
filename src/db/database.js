// database.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  username: String,
  fullName: String,
  phoneNumber: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
