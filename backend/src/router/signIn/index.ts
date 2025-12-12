import { publicProcedure } from '../../lib/trpc'
import { zSignInTrpcInput } from './input'
import getPasswordHash from '../../utils/getPasswordHash'

export const signInTrpcRoute = publicProcedure
  .input(zSignInTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    })

    if (!user) {
      throw Error('Wrong nick or password')
    }

    return `Sign in user: ${input.nick}`
  })
