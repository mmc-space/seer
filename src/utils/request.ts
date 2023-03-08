import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  timeout: 10000,
}

const instance = axios.create(axiosConfig)

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (!config.headers) config.headers = {}

  config.headers.token = token

  return config
})

instance.interceptors.response.use(({ data }) => data)

export default instance
