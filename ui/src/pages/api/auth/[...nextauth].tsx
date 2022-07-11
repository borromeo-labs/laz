import axios from 'axios'
import NextAuth, { CallbacksOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const instance = axios.create({
  baseURL: process.env.API_URL
})

const credentials = CredentialsProvider({
  name: 'Laz Login',
  credentials: {
    username: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' }
  },
  async authorize(credentials, req) {
    console.log('Authorize', credentials)

    const response = await instance.post('/oauth/token', {
      username: credentials?.username,
      password: credentials?.password,
      grant_type: 'password',
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET
    })

    console.log(response)

    return (
      await instance.get('/auth/user', {
        headers: { Authorization: `Bearer ${response.data.access_token}` }
      })
    ).data.user
  }
})

const callbacks: Partial<CallbacksOptions> = {
  async signIn({ user, credentials }) {
    console.log('SignIn')
    const response = await instance.post('/oauth/token', {
      username: credentials?.username,
      password: credentials?.password,
      grant_type: 'password',
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET
    })

    user.accessToken = response.data.access_token

    return true
  },

  async session({ session, token }) {
    console.log('Session')
    session.accessToken = token.accessToken
    const response = await instance.get('/auth/user', {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
    session.user = response.data.user
    return session
  },

  async jwt({ user, token }) {
    console.log('JWT')
    if (user) return { accessToken: user.accessToken }
    return token
  }
}

export default NextAuth({
  providers: [credentials],
  callbacks,
  secret: process.env.OAUTH_CLIENT_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/register'
  }
})
