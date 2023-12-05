import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET(request, { params }) {
  const user = await prisma.transferencia.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(user);
}

export async function POST(request, { params }) {


  return NextResponse.json("POST de transferencias " + params.id);
}

export function PUT(request, { params }) {
  return NextResponse.json("PUT de transferencias " + params.id);
}

export function DELETE(request, { params }) {
  return NextResponse.json("DELETE de transferencias" + params.id);
}

