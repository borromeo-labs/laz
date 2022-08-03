import { NextResponse, NextRequest } from 'next/server'
import { getSession } from 'next-auth/react'

const guest = ['/login', '/register']

const guarded = ['/']

export const middleware = async (req: NextRequest) => {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get('cookie')
    }
  }

  // https://github.com/nextauthjs/next-auth/discussions/4265#discussioncomment-2497667
  //@ts-ignore
  const session = await getSession({ req: requestForNextAuth })

  if (guest.includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (guarded.includes(req.nextUrl.pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}
