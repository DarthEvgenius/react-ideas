import { publicProcedure } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'
import { ideas } from '../../lib/ideas'

// here we validate input just like in frontend's NewIdeaPage
export const createIdeaTrpcRoute = publicProcedure
  .input(zCreateIdeaTrpcInput)
  .mutation(({ input }) => {
    ideas.unshift(input)
    return 'Idea has been added'
  })
