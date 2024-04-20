import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Pressable } from 'native-base'
import useAuth from '../../hooks/useAuth'
import Carousel from 'react-native-reanimated-carousel'
import CourseCard from '@/src/components/CourseCard'
import useCourse from '@/src/hooks/api/useCourseApi'
import { IPagination } from '@/src/interfaces/pagination.interface'
import { ICourse } from '@/src/interfaces/course.interface'
import { Ionicons } from '@expo/vector-icons'

const HomeScreen = ({ navigation }: any) => {
  const { idToken, user } = useAuth()
  const width = Dimensions.get('window').width
  const carouselData = [
    require('../../../assets/landing-image.jpg'),
    require('../../../assets/landing-image3.jpg'),
    require('../../../assets/landing-image4.jpg')
  ]
  const { getCourses } = useCourse()

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
  const [freeCourses, setFreeCourses] = useState<IPagination<ICourse>>(initialData)
  const [paidCourses, setPaidCourses] = useState<IPagination<ICourse>>(initialData)

  const getAllData = async () => {
    try {
      const response = await Promise.all([getCourses(1, 3, 'FREE'), getCourses(1, 3, 'PAID')])
      if (response) {
        setFreeCourses(response[0] || initialData)
        setPaidCourses(response[1] || initialData)
      }
    } catch (error) {
      console.error()
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getAllData()
    setIsLoading(false)
    return () => {}
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} bounces={false}>
      <View style={styles.headerView}>
        {idToken ? (
          <>
            <Text style={styles.header}>Hi, {user?.name}</Text>
            <Text style={{ fontSize: 16, color: 'white' }}>Let's start learning!</Text>
          </>
        ) : (
          <>
            <Text style={styles.header}>{idToken ? 'Hi, ' + user?.name : 'Login to save your path !'}</Text>
            <Button
              variant={'outline'}
              style={styles.loginButton}
              _text={{ color: 'white' }}
              onPress={() => navigation.navigate('Login' as never)}
            >
              Login
            </Button>
          </>
        )}
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 20, paddingBottom: 0 }}>
        What do you want to learn?
      </Text>
      <Carousel
        // loop
        width={width}
        height={200}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={800}
        autoPlayInterval={5000}
        pagingEnabled={true}
        snapEnabled={true}
        renderItem={({ item }) => (
          <Image
            defaultSource={500}
            source={item}
            style={{ aspectRatio: 16 / 9, height: '100%', minWidth: '100%', borderRadius: 10 }}
          />
        )}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 48
        }}
      />
      {/* <Button onPress={() => getAllData()}>Get data</Button> */}
      <Pressable
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          paddingBottom: 20
        }}
        onPress={() => navigation.navigate('Courses', { courseType: 'FREE' })}
      >
        <Text style={{ fontSize: 24, fontWeight: '500' }}>Free courses</Text>
        <Ionicons name='arrow-forward' size={24} color='black' />
      </Pressable>
      <View style={{ paddingHorizontal: 20 }}>
        {freeCourses.docs.length && !isLoading ? (
          freeCourses.docs.map((course, index) => <CourseCard key={index} data={course} />)
        ) : (
          <Text style={{ fontSize: 20, fontWeight: '400', paddingBottom: 20 }}>No free courses available</Text>
        )}
      </View>
      <Pressable
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          paddingBottom: 20
        }}
        onPress={() => navigation.navigate('Courses', { courseType: 'PAID' })}
      >
        <Text style={{ fontSize: 24, fontWeight: '500' }}>Paid courses</Text>
        <Ionicons name='arrow-forward' size={24} color='black' />
      </Pressable>
      <View style={{ paddingHorizontal: 20 }}>
        {paidCourses.docs.length && !isLoading ? (
          paidCourses.docs.map((course, index) => <CourseCard key={index} data={course} />)
        ) : (
          <Text style={{ fontSize: 20, fontWeight: '400', paddingBottom: 20 }}>No paid courses available</Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerView: {
    backgroundColor: '#3D5CFF',
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 24
  },

  header: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  loginButton: {
    width: 100,
    padding: 2,
    borderColor: 'white',
    borderRadius: 10
  }
})

export default HomeScreen
