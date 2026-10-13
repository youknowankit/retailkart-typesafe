import { model, Schema } from "mongoose";
import type { IUser } from "./user.types.js";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    profilePic: {
      type: String,
      default: "",
    },

    profilePicPublicId: {
      type: String,
      default: "",
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    zipCode: {
      type: String,
      trim: true,
    },

    phoneNo: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const User = model<IUser>("User", userSchema);
export default User;
