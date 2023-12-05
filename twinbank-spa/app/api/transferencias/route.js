import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET() {

  const transferencias = await prisma.transferencia.findMany()
  return NextResponse.json(transferencias);
}

export async function POST( request ) {
  const data = await request.json()
  const newTransferencia = await prisma.transferencia.create({
    data: data
  })
  return NextResponse.json(newTransferencia);
}

export function PUT(request, { params }) {
  return NextResponse.json("PUT de transferencias " + params.id);
}


/* export function DELETE(request, { params }) {
  return NextResponse.json("DELETE de transferencias" + params.id);
} */