import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/jwt";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const userId = getUserIdFromRequest(request);
  
  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401 }
    );
  }
  
  const expenses = await prisma.expense.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request);
  
  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401 }
    );
  }
  
  const data = await request.json();
  
  // Validate categoryId belongs to the user
  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
      userId,
    },
  });
  
  if (!category) {
    return new NextResponse(
      JSON.stringify({ error: "Invalid category" }),
      { status: 400 }
    );
  }
  
  const expense = await prisma.expense.create({
    data: {
      amount: Number.parseFloat(data.amount),
      description: data.description,
      categoryId: data.categoryId,
      userId,
    },
    include: { category: true },
  });
  
  return NextResponse.json(expense);
}
