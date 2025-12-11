import { publicProcedure } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

// here we validate input just like in frontend's NewIdeaPage
export const createIdeaTrpcRoute = publicProcedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    
    const oldIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick
      }
    })

    if (oldIdea) {
      throw Error('Idea with this nick is already exists')
    }

    await ctx.prisma.idea.create({
      data: input
    })

    return 'Idea has been added'
  })
