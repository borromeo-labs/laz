const config = {
  app: {
    title: 'Laz'
  },

  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    oauthClientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET
  }
}

export { config }
