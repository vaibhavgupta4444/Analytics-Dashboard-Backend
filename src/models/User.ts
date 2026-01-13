import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user-interface";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, minLength: 6 },
    role: { type: String, default: "user" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;