import express from 'express'
import { trpcRouter } from './router'
import cors from 'cors'
import { applyTrpcToExporessApp } from './lib/trpc';
import { type AppContext, createAppContext } from './lib/ctx'

;(async () => {
  let ctx: AppContext | null = null

  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())
    
    expressApp.get('/', (req, res) => {
      res.send('root')
    })
    
    applyTrpcToExporessApp(expressApp, ctx, trpcRouter)
    
    expressApp.listen(3456, () => {
      console.log('Listenint at http://localhost:3456')
    })
  } catch(error) {
    console.error(error)
    await ctx?.stop()
  }
})()
