import { type Express } from 'express'
import { type TrpcRouterType } from './router'
import * as trcpExpress from '@trpc/server/adapters/express'

export const applyTrpcToExporessApp = (
  expressApp: Express,
  trpcRouter: TrpcRouterType
) => {
  expressApp.use(
    '/trpc',
    trcpExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  )
}
