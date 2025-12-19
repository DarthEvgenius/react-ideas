import { Passport } from 'passport'
import { AppContext } from './ctx'
import { type Express } from 'express'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { env } from './env'

export function applyPassportToExpressApp(
  expressApp: Express,
  ctx: AppContext
) {
  const passport = new Passport()

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      },
      (jwtPayload: string, done) => {
        ctx.prisma.user
          .findUnique({ where: { id: jwtPayload } })
          .then((user) => {
            if (user) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          })
          .catch((err) => {
            return done(err, false)
          })
      }
    )
  )

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next()
      return
    }
    passport.authenticate(
      'jwt',
      { session: false },
      // this callback makes user sign Out if token is invalid
      (...args: any[]) => {
        req.user = args[1] || undefined
        next()
      }
    )(req, res, next)
  })
}
