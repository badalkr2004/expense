import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany();
  console.log(categories);
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const data = await request.json();
  const category = await prisma.category.create({
    data: { name: data.name },
  });
  return NextResponse.json(category);
}
