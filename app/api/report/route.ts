import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const expenses = await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
  });
  return NextResponse.json(expenses);
}
