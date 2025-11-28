import { initTRPC } from '@trpc/server'
import _ from 'lodash'

const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i}`,
  description: `Description of idea ${i}...`,
  text: _.times(50, (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(
    ''
  ),
}))

const trpc = initTRPC.create()
export const publicProcedure = trpc.procedure

export const trpcRouter = trpc.router({
  getIdeas: publicProcedure.query(() => {
    return { ideas: ideas.map((idea) => _.omit(idea, ['text'])) }
  }),
})

export type TrpcRouterType = typeof trpcRouter
