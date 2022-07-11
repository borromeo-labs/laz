import { User } from './api'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
