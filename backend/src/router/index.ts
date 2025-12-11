import { trpc } from '../lib/trpc'

/* cmd + shift + p --> generate index
 * Here we generate importing files via 'generate index' VS code extension
 * use command pallete: cmd + shift + p --> generate index
 * expect to have index.ts files in folders, and folder's names are used to generate names of functions for export
 */

// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createIdeaTrpcRoute } from './createIdea'
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrpcRoute } from './getIdeas'
import { signUpTrpcRoute } from './signUp'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
})

export type TrpcRouterType = typeof trpcRouter
