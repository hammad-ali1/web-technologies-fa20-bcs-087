import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema<ModelTypes.User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
