import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const expenses = await prisma.expense.findMany({
    include: { category: true },
    orderBy: { date: "desc" },
  })
  return NextResponse.json(expenses)
}

export async function POST(request: Request) {
  const data = await request.json()
  const expense = await prisma.expense.create({
    data: {
      amount: Number.parseFloat(data.amount),
      description: data.description,
      categoryId: data.categoryId,
    },
    include: { category: true },
  })
  return NextResponse.json(expense)
}

