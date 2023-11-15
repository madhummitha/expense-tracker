import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export async function POST(request: NextRequest) {
  await dbConnect();

  const body = await request.json();
  const transaction = await Transaction.create(body);
  return NextResponse.json(transaction, { status: 201 });
}
