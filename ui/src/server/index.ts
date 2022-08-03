import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const guest = ['/login', '/register']

const guarded = ['/']

const getGuardedRoutesServerProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (context.req.url && guest.includes(context.req.url)) {
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }

  if (context.req.url && guarded.includes(context.req.url)) {
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export { getGuardedRoutesServerProps }
