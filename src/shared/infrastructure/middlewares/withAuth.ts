import type { NextApiRequest } from 'next'

import { getToken } from 'next-auth/jwt'

export const withAuth = async (req: NextApiRequest) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  if (!token) return new Response('Unauthorized', { status: 401 })
}
