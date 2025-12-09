import { publicProcedure } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'
import { ideas } from '../../lib/ideas'

// here we validate input just like in frontend's NewIdeaPage
export const createIdeaTrpcRoute = publicProcedure
  .input(zCreateIdeaTrpcInput)
  .mutation(({ input }) => {
    if (ideas.find((idea) => idea.nick === input.nick)) {
      throw Error('Idea with this nick is already exists')
    }
    ideas.unshift(input)
    return 'Idea has been added'
  })
