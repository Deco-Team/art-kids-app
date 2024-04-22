import { useCallback } from 'react'
import useApi from './useApi'
import { log } from '@/src/utils/logger.util'
import { AxiosError } from 'axios'

const useOrder = () => {
  const callApi = useApi()
  const endpoint = 'orders/customer'

  const createOrder = useCallback(
    async (courseId: string) => {
      try {
        const response = await callApi<{
          partnerCode: string
          requestId: string
          orderId: string
          amount: number
          responseTime: number
          message: string
          resultCode: number
          payUrl: string
          shortLink: string
          deeplink: string
        }>('post', endpoint, {}, {}, { items: [{ courseId }] })
        if (response.error) {
          throw new Error(response.message)
        }
        return response.data
      } catch (error) {
        let errorLog = 'Create Order API:\n\t'
        if (error instanceof AxiosError) {
          log.error(errorLog + error.response)
        } else {
          log.error(errorLog + error)
        }
        return null
      }
    },
    [callApi]
  )

  return {
    createOrder
  }
}

export default useOrder
