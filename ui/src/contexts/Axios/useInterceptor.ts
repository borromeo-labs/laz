import { useEffect } from 'react'
import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { useLatestValue } from '@/hooks'

type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig

type ResponseInterceptor = (error: AxiosError) => Promise<AxiosError>

const useInterceptor = (instance: AxiosInstance, req?: RequestInterceptor, res?: ResponseInterceptor) => {
  const reqRef = useLatestValue(req)

  const resRef = useLatestValue(res)

  useEffect(() => {
    const requestEject = instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return reqRef.current ? reqRef.current(config) : config
    })

    const responseEject = instance.interceptors.response.use(null, (error: AxiosError) => {
      return resRef.current ? resRef.current(error) : Promise.reject(error)
    })

    return () => {
      instance.interceptors.request.eject(requestEject)

      instance.interceptors.response.eject(responseEject)
    }
  }, [])
}

export { useInterceptor }
