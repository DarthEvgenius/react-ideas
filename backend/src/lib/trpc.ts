import { initTRPC } from '@trpc/server'
import { type AppContext } from './ctx'

export const trpc = initTRPC.context<AppContext>().create()
export const publicProcedure = trpc.procedure
