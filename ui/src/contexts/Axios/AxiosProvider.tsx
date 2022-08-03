import axios, { AxiosInstance } from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import { config } from '@/config'
import { useInterceptor } from './useInterceptor'

const Context = createContext<{ axios: AxiosInstance }>({
  axios: axios
})

// @TODO: we probably should rename this to AuthProvider as we're
// doing more than just sharing the axios instance (e.g., hiding as session is loading)
const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instance] = useState<AxiosInstance>(() => {
    return axios.create({ baseURL: config.api.baseUrl })
  })

  const { data, status } = useSession()

  useInterceptor(instance, (config) => {
    if (data?.accessToken) {
      config.headers = config.headers ?? {}
      config.headers['Authorization'] = `Bearer ${data?.accessToken}`
    }

    return config
  })

  return <Context.Provider value={{ axios: instance }}>{status === 'loading' ? null : children}</Context.Provider>
}

const useAxios = () => {
  return useContext(Context)
}

export { AxiosProvider, useAxios }
