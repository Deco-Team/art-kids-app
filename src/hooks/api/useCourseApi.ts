import React from 'react'
import useApi from './useApi'
import { ICourse } from '@/src/business/course/course'
import { IPagination } from '@/src/interfaces/pagination.interface'
import { AxiosError } from 'axios'

const useCourse = () => {
  const callApi = useApi()
  const endpoint = 'courses/customer'

  const getCourses = React.useCallback(
    async (page: number, pageSize: number, type: string) => {
      try {
        const response = await callApi<IPagination<ICourse>>(
          'get',
          endpoint + (type ? `?type=${type}` : ''),
          {},
          { page, limit: pageSize },
          {}
        )
        return response.data
      } catch (error) {
        console.log('error Courses ' + error)
      }
    },
    [callApi]
  )

  const getCourseDetail = React.useCallback(
    async (id: string) => {
      try {
        const response = await callApi<ICourse>('get', `${endpoint}/${id}`)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getMyCourses = React.useCallback(
    async (page: number, pageSize: number) => {
      try {
        const response = await callApi<IPagination<ICourse>>(
          'get',
          `${endpoint}/my-courses`,
          {},
          { page, limit: pageSize },
          {}
        )
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getMyCourseDetail = React.useCallback(
    async (id: string) => {
      try {
        const response = await callApi<ICourse>('get', `${endpoint}/my-courses/${id}`)
        return response.data
      } catch (error) {
        return false
      }
    },
    [callApi]
  )

  const completeLesson = React.useCallback(
    async (id: string, index: number) => {
      try {
        const response = await callApi<ICourse>(
          'patch',
          `${endpoint}/my-courses/${id}/complete-lesson`,
          {},
          { courseId: id },
          { lessonIndex: index }
        )
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getCourses, getCourseDetail, getMyCourses, getMyCourseDetail, completeLesson }
}

export default useCourse
