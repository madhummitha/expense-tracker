import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
    },
    date: {
      type: Number,
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

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
