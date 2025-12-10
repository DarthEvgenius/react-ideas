import { publicProcedure } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

// here we validate input just like in frontend's NewIdeaPage
export const createIdeaTrpcRoute = publicProcedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    // if (ideas.find((idea) => idea.nick === input.nick)) {
    //   throw Error('Idea with this nick is already exists')
    // }
    // ideas.unshift(input)
    
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
