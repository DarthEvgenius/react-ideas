import { publicProcedure } from '../../lib/trpc'
import { ideas } from '../../lib/ideas'
import _ from 'lodash'

export const getIdeasTrpcRoute = publicProcedure.query(() => {
  return { ideas: ideas.map((idea) => _.omit(idea, ['text'])) }
})
