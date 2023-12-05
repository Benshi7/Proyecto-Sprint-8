import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body

  try {
    const foundUser = await prisma.usuario.findUnique({
      where: {
        username_password: {
          username: username,
          password: password
        }
      }
    })
    if (foundUser) {
      return res.status(200).json(foundUser)
    } else {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}