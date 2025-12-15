import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

export const createAppContext = () => {
  const connectionString = `${process.env.DATABASE_URL}`

  const adapter = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter })

  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
    req: Request,
    res: Response
  }
}

export type AppContext = ReturnType<typeof createAppContext>
