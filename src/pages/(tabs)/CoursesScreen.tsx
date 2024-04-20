import { Actionsheet, Box, Button, IconButton, Input, Text, View, useDisclose } from 'native-base'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import useCourse from '@/src/hooks/api/useCourseApi'
import { ICourse } from '@/src/interfaces/course.interface'
import { IPagination } from '@/src/interfaces/pagination.interface'
import CourseCard from '@/src/components/CourseCard'

const CoursesScreen = ({ route }: any) => {
  let { courseType } = route.params || {}
  const { isOpen, onOpen, onClose } = useDisclose()
  const { getCourses } = useCourse()

  const [type, setType] = useState('ALL')

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
      const response = await getCourses(1, 100, type === 'ALL' ? '' : type)
      if (response) {
        setData(response || initialData)
      }
    } catch (error) {
      console.error()
    }
  }

  useEffect(() => {
    if (courseType) {
      setType(courseType)
    }
    getAllData()
  }, [courseType, type])

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Box alignItems='center'>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w='100%' h={60} px={4} justifyContent='center'>
              <Text fontSize='16' color='gray.500'>
                Albums
              </Text>
            </Box>
            <Actionsheet.Item>Delete</Actionsheet.Item>
            <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
            <Actionsheet.Item>Play</Actionsheet.Item>
            <Actionsheet.Item>Favourite</Actionsheet.Item>
            <Actionsheet.Item>Cancel</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        <Input
          size={'xl'}
          w={'100%'}
          h={60}
          borderRadius={10}
          variant={'filled'}
          InputRightElement={
            <IconButton
              marginRight={2}
              borderRadius={'full'}
              _pressed={{ bg: 'gray.200', opacity: 0.6 }}
              icon={<Ionicons name='filter' size={24} color='black' />}
              onPress={onOpen}
            />
          }
          placeholder='Search'
          _focus={{
            backgroundColor: 'white',
            borderColor: '#3D5CFF',
            borderWidth: 2
          }}
          placeholderTextColor={'#B8B8D2'}
          backgroundColor={'#F4F3FD'}
          color={'#000000'}
        />
      </Box>
      <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'center', paddingVertical: 20, paddingTop: 30 }}>
        Choose your course
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Button
          borderRadius={'full'}
          style={{ width: 70 }}
          variant={type === 'ALL' ? 'solid' : 'outline'}
          colorScheme={'blue'}
          disabled={type === 'ALL'}
          onPress={() => setType('ALL')}
          _text={{ color: type === 'ALL' ? 'white' : '#858597', fontSize: 14 }}
        >
          All
        </Button>
        <Button
          borderRadius={'full'}
          style={{ width: 70, marginHorizontal: 20 }}
          variant={type === 'FREE' ? 'solid' : 'outline'}
          colorScheme={'blue'}
          disabled={type === 'FREE'}
          onPress={() => setType('FREE')}
          _text={{ color: type === 'FREE' ? 'white' : '#858597', fontSize: 14 }}
        >
          Free
        </Button>
        <Button
          borderRadius={'full'}
          style={{ width: 70 }}
          variant={type === 'PAID' ? 'solid' : 'outline'}
          colorScheme={'blue'}
          disabled={type === 'PAID'}
          onPress={() => setType('PAID')}
          color={type === 'PAID' ? 'white' : '#858597'}
          _text={{ color: type === 'PAID' ? 'white' : '#858597', fontSize: 14 }}
        >
          Paid
        </Button>
      </View>
      <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false} bounces={false}>
        {data.docs.length && !isLoading ? (
          <>
            {data.docs.map((course, index) => (
              <CourseCard key={index} data={course} />
            ))}
          </>
        ) : (
          <Text style={{ fontSize: 20, fontWeight: '400', paddingBottom: 20 }}>
            No {type === 'ALL' ? '' : type.toLocaleLowerCase()} courses available
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CoursesScreen
