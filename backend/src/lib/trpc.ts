import { type Express } from 'express'
import { type TrpcRouterType } from '../router'
import * as trpcExpress from '@trpc/server/adapters/express'
import { initTRPC } from '@trpc/server'
import { type AppContext } from './ctx'
import SuperJSON from 'superjson'
import { type ExpressRequest } from '../utils/types'

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as ExpressRequest).user || null,
  })

type TrpcContext = Awaited<ReturnType<typeof getCreateTrpcContext>>

export const trpc = initTRPC.context<TrpcContext>().create({
  transformer: SuperJSON,
})
export const publicProcedure = trpc.procedure

export const applyTrpcToExporessApp = async (
  expressApp: Express,
  appContext: AppContext,
  trpcRouter: TrpcRouterType
) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  )
}
