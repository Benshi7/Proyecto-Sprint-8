import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET() {

  const usuarios = await prisma.usuario.findMany()
  console.log(usuarios)

  return NextResponse.json(usuarios);
}

export async function POST(request) {
  const { username, password, saldo} = await request.json()
  const newUsuario = await prisma.usuario.create({
    data: {
      username,
      password,
      saldo
    }
  })
  return NextResponse.json("POST de usuarios");
}