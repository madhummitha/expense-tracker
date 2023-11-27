import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { registerUserSchema } from "@/validations/users";

export async function POST(request: NextRequest) {
  await dbConnect();

  const body = await request.json();
  const validation = registerUserSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  await User.create(body);
  return NextResponse.json("Registered Successfully!", { status: 201 });
}
