import { publicProcedure } from '../../lib/trpc'
import { zSignUpTrpcInput } from './input'
import crypto from 'crypto'

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

    await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: crypto
          .createHash('sha256')
          .update(input.password)
          .digest('hex'),
      },
    })

    return 'New User has been added'
  })
