import { publicProcedure } from '../../lib/trpc'

export const getIdeasTrpcRoute = publicProcedure.query(async({ctx}) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return { ideas }
})
