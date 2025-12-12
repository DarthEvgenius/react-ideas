import { type Express } from 'express'
import { type TrpcRouterType } from '../router'
import * as trcpExpress from '@trpc/server/adapters/express'
import { initTRPC } from '@trpc/server'
import { type AppContext } from './ctx'
import SuperJSON from 'superjson'

export const trpc = initTRPC.context<AppContext>().create({
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
    trcpExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )
}
