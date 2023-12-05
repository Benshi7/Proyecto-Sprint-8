import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET() {

  const formulario = await prisma.formulario.findMany()
  return NextResponse.json(formulario);
}

export async function POST( request ) {
  const data = await request.json()
  const newFormulario = await prisma.formulario.create({
    data: data
  })
  return NextResponse.json(newFormulario);
}

export function PUT(request, { params }) {
  return NextResponse.json("PUT de Formulario " + params.id);
}