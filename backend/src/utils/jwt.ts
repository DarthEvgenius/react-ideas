import jwt from 'jsonwebtoken'
import { env } from '../lib/env'

const JWT_SECRET = env.JWT_SECRET

export const signJWT = (userId: string): string => {
  return jwt.sign(userId, JWT_SECRET)
}

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.log('error in jwt.ts:', error)
    return null
  }
}

export const decodeJWT = (token: string) => {
  try {
    return jwt.decode(token)
  } catch (error) {
    console.log('error in jwt.ts:', error)
    return null
  }
}
