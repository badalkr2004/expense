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
  
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const month = searchParams.get('month');

  let whereClause: Prisma.ExpenseWhereInput = {
    userId,
  };

  if (startDate && endDate) {
    whereClause = {
      ...whereClause,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    };
  } else if (month) {
    const [year, monthNum] = month.split('-');
    const start = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
    const end = new Date(parseInt(year), parseInt(monthNum), 0);
    
    whereClause = {
      ...whereClause,
      date: {
        gte: start,
        lte: end,
      },
    };
  }

  const expenses = await prisma.expense.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { date: 'desc' },
  });

  // Convert to CSV
  const headers = ['Date', 'Description', 'Amount', 'Category'];
  const csvRows = [
    headers.join(','),
    ...expenses.map(expense => [
      new Date(expense.date).toLocaleDateString(),
      `"${expense.description.replace(/"/g, '""')}"`,
      expense.amount,
      expense.category.name,
    ].join(','))
  ].join('\n');

  return new NextResponse(csvRows, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="expenses.csv"',
    },
  });
} 