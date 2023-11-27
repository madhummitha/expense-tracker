import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  { timestamps: { currentTime: () => Date.now() } }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const rounds = 10;
    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error: any) {
    return next(error);
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
