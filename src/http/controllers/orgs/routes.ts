import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { refreshToken } from './refresh-token'
import { verfiyJWT } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refreshToken)

  /** Authenticated Routes */
  app.get('/profile', { onRequest: [verfiyJWT] }, profile)
}
