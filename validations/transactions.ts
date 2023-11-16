import { z } from "zod";

const TRANSACTION_TYPES = ["CREDIT", "DEBIT"];

export const createTransactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  amount: z.number(),
  type: z
    .string()
    .refine((value) => TRANSACTION_TYPES.includes(value), {
      message: "Transaction type should be either 'CREDIT' or 'DEBIT'",
    }),
  date: z.number(),
});
