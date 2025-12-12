import crypto from 'crypto'

export default function getPasswordHash(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex')
}
