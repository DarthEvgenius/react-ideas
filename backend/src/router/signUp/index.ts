import { publicProcedure } from '../../lib/trpc'
import { zSignUpTrpcInput } from './input'
// import crypto from 'crypto'
import getPasswordHash from '../../utils/getPasswordHash'
import { signJWT } from '../../utils/jwt'

export const signUpTrpcRoute = publicProcedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const oldUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    })

    if (oldUser) {
      throw Error('User with this nick is already exists')
    }

    const user = await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    })

    const token = signJWT(user.id)
    
    return { token }
  })
