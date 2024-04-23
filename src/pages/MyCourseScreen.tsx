import { SafeAreaView, ScrollView, Text } from 'react-native'
import useCourse from '../hooks/api/useCourseApi'
import { useEffect, useState } from 'react'
import { IPagination } from '../interfaces/pagination.interface'
import { ICourse } from '../business/course/course'
import MyCourseCard from '../components/MyCourseCard'
import { Box, Flex } from 'native-base'
import { useIsFocused } from '@react-navigation/native'

const MyCourseScreen = () => {
  const { getMyCourses } = useCourse()
  const isFocused = useIsFocused()

  const initialData = {
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  }
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IPagination<ICourse>>(initialData)

  const getAllData = async () => {
    try {
      const response = await getMyCourses(1, 100)
      if (response) {
        setData(response || initialData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getAllData()
    setIsLoading(false)
  }, [isFocused])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 20, paddingTop: 0 }}>My Courses</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Flex flexDirection={'row'} flexWrap={'wrap'} justifyContent={'space-evenly'}>
          {data.docs.length && !isLoading ? (
            data.docs.map((course, index) => (
              <Box key={index} width={'43%'} mb={4}>
                <MyCourseCard data={course} index={index} />
              </Box>
            ))
          ) : (
            <Text style={{ fontSize: 20, fontWeight: '400', paddingBottom: 20 }}>No courses available</Text>
          )}
        </Flex>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyCourseScreen
