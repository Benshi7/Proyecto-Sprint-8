import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
    const formulario = await prisma.formulario.findMany();
    return NextResponse.json(formulario);
  }

  export async function POST(request, { params }) {

    return NextResponse.json("POST de formulario " + params.id);
  }

  export function PUT(request, { params }) {
    return NextResponse.json("PUT de formulario " + params.id);
  }

  export function DELETE(request, { params }) {
    return NextResponse.json("DELETE de formulario" + params.id);
  }
