import express from 'express'
import * as trcpExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'


const expressApp = express()
expressApp.use(cors())

expressApp.get('/', (req, res) => {
  res.send('root')
})

expressApp.use(
  '/trpc',
  trcpExpress.createExpressMiddleware({
    router: trpcRouter
  })
)

expressApp.listen(3456, () => {
  console.log('Listenint at http://localhost:3456')
})
