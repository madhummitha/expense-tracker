import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export const getAllTransactions = async (userId: string) => {
  await dbConnect();
  const transactions = await Transaction.find({ userId });
  return transactions;
};
