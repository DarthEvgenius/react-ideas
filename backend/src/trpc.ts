import { type Express } from 'express'
import { type TrpcRouterType } from './router'
import * as trcpExpress from '@trpc/server/adapters/express'
import { type AppContext } from './lib/ctx'

export const applyTrpcToExporessApp = (
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
