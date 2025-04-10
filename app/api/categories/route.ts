import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/jwt";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  console.log(request);
  const userId = getUserIdFromRequest(request);
  
  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401 }
    );
  }
  
  const categories = await prisma.category.findMany({
    where: { userId },
  });
  
  return NextResponse.json(categories);
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
  
  // Check if category with same name already exists for this user
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: data.name,
      userId,
    },
  });
  
  if (existingCategory) {
    return new NextResponse(
      JSON.stringify({ error: "Category already exists" }),
      { status: 409 }
    );
  }
  
  const category = await prisma.category.create({
    data: { 
      name: data.name,
      userId,
    },
  });
  
  return NextResponse.json(category);
}
