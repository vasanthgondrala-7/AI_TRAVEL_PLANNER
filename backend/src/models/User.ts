import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>(
  "User",
  userSchema
);