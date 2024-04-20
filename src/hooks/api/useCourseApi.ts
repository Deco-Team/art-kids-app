import React from 'react'
import useApi from './useApi'
import { ICourse } from '@/src/interfaces/course.interface'
import { IPagination } from '@/src/interfaces/pagination.interface'

const useCourse = () => {
  const callApi = useApi()
  const endpoint = 'courses/customer'

  const getCourses = React.useCallback(
    async (page: number, pageSize: number, type: string) => {
      try {
        const response = await callApi<{ data: IPagination<ICourse> }>(
          'get',
          endpoint + (type ? `?type=${type}` : ''),
          {},
          { page, limit: pageSize },
          {}
        )
        return response.data.data
      } catch (error) {
        console.log('error Courses ' + error)
      }
    },
    [callApi]
  )

  const getCourseDetail = React.useCallback(
    async (id: string) => {
      try {
        const response = await callApi<{ data: ICourse }>('get', `${endpoint}/${id}`)
        return response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getCourses, getCourseDetail }
}

export default useCourse
