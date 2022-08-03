import axios from 'axios'
import NextAuth, { CallbacksOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { config } from '@/config'

const instance = axios.create({
  baseURL: config.api.baseUrl
})

const credentials = CredentialsProvider({
  name: 'Laz Login',
  credentials: {
    username: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' }
  },
  async authorize(credentials, req) {
    const response = await instance.post('/oauth/token', {
      username: credentials?.username,
      password: credentials?.password,
      grant_type: 'password',
      client_id: config.api.oauthClientId,
      client_secret: config.api.oauthClientSecret
    })

    return (
      await instance.get('/auth/user', {
        headers: { Authorization: `Bearer ${response.data.access_token}` }
      })
    ).data.user
  }
})

const callbacks: Partial<CallbacksOptions> = {
  async signIn({ user, credentials }) {
    // @TODO Leaving this here for now.
    // Some references I used had both authorize (see above) and
    // this callback function, and I honestly don't understand why.
    // Let's figure out later.
    console.log('Sign In')

    const response = await instance.post('/oauth/token', {
      username: credentials?.username,
      password: credentials?.password,
      grant_type: 'password',
      client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET
    })

    user.accessToken = response.data.access_token

    return true
  },

  async session({ session, token }) {
    // @TODO Leaving this here: for some reason, this callback
    // gets called multiple times in a single request. That's not good.
    console.log('Session')

    session.accessToken = token.accessToken
    const response = await instance.get('/auth/user', {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
    session.user = response.data.user
    return session
  },

  async jwt({ user, token }) {
    // @TODO Leaving this here: for some reason, this callback
    // gets called multiple times in a single request. That's not good.
    console.log('JWT')

    if (user) return { accessToken: user.accessToken }
    return token
  }
}

export const authOptions = {
  providers: [credentials],
  callbacks,
  secret: process.env.OAUTH_CLIENT_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/register'
  }
}

export default NextAuth(authOptions)
