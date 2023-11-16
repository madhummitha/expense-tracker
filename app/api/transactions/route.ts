import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { createTransactionSchema } from "@/validations/transactions";

export async function POST(request: NextRequest) {
  await dbConnect();

  const body = await request.json();
  const validation = createTransactionSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const transaction = await Transaction.create(body);
  return NextResponse.json(transaction, { status: 201 });
}
