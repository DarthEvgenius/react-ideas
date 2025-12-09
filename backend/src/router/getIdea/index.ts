import { publicProcedure } from '../../lib/trpc'
import { z } from 'zod'
import { ideas } from '../../lib/ideas'

export const getIdeaTrpcRoute = publicProcedure
  .input(
    z.object({
      ideaNick: z.string(),
    })
  )
  .query(({ input }) => {
    const idea = ideas.find((idea) => idea.nick === input.ideaNick)
    return { idea: idea || null }
  })
