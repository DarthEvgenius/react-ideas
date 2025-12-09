import { trpc } from '../lib/trpc'

import { getIdeaTrpcRoute } from '../router/getIdea'
import { getIdeasTrpcRoute } from '../router/getIdeas'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
})

export type TrpcRouterType = typeof trpcRouter
