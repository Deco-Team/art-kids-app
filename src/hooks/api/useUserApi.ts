import { IRegisterFormProps } from '@/src/interfaces/auth.interface'
import useApi from './useApi'
import React from 'react'
import { GET, POST } from '@/src/utils/api.caller'
import { AxiosError } from 'axios'

const useUser = () => {
  const callApi = useApi()
  const registerEndpoint = 'auth/customer/register'
  const customerEndpoint = 'customer/me'

  const register = React.useCallback(
    async (data: IRegisterFormProps) => {
      try {
        await POST(registerEndpoint, data, {}, {})
      } catch (error) {
        if (error instanceof AxiosError && error.response && error.response.data) {
          console.log(error.response.data.message)
          return error.response.data.message
        }
        return false
      }
    },
    [callApi]
  )

  const getInfo = React.useCallback(async () => {
    try {
      const response = await GET(customerEndpoint, {}, {})
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  return { register, getInfo }
}

export default useUser
