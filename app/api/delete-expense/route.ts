import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  const id = await request.json();
  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }
  //   const expense = await prisma.expense.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  return NextResponse.json(id);
}
