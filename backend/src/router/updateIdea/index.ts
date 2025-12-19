import { publicProcedure } from '../../lib/trpc'
import { zUpdateIdeaTrpcInput } from './input'

export const updateIdeaTrpcRoute = publicProcedure
  .input(zUpdateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw Error('UNAUTHORIZED')
    }

    const { ideaId, ...ideaInput } = input

    const idea = await ctx.prisma.idea.findUnique({
      where: {
        id: ideaId,
      },
    })

    if (!idea) {
      throw Error('Idea not found')
    }

    if (idea.authorId !== ctx.me.id) {
      throw Error('FORBIDDEN, not your idea.')
    }

    if (idea.nick !== ideaInput.nick) {
      const extIdea = await ctx.prisma.idea.findUnique({
        where: {
          nick: ideaInput.nick,
        },
      })

      if (extIdea) {
        throw Error('Idea with this nick is already exists')
      }
    }

    await ctx.prisma.idea.update({
      where: {
        id: ideaId,
      },
      data: { ...ideaInput },
    })

    return 'Idea has been updated'
  })
