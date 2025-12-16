import express from 'express'
import { trpcRouter } from './router'
import cors from 'cors'
import { applyTrpcToExporessApp } from './lib/trpc'
import { type AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'
import { env } from './lib/env'
;(async () => {
  let ctx: AppContext | null = null

  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())

    applyPassportToExpressApp(expressApp, ctx)

    await applyTrpcToExporessApp(expressApp, ctx, trpcRouter)

    expressApp.listen(env.PORT, () => {
      console.log('Listenint at http://localhost:' + env.PORT)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
