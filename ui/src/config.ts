const config = {
  app: {
    title: 'Laz',
    tagline: 'Personal expense tracker for lazy people',
  },

  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    oauthClientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
  },

  rollbar: {
    token: process.env.NEXT_PUBLIC_ROLLBAR_TOKEN,
    env: process.env.NEXT_PUBLIC_ROLLBAR_ENV,
  },
}

export { config }
