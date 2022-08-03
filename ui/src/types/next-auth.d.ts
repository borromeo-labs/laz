import 'next-auth'

// https://github.com/nextauthjs/next-auth/issues/671#issuecomment-830275305
declare module 'next-auth' {
  type APIUser = import('./api').User

  interface User extends APIUser {}

  interface Session {
    user: User
  }
}
