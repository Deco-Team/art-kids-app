import React from 'react'
import { Container, Divider, Flex, Heading, Image, Text, Button } from 'native-base'
import { useCheckoutStore } from '@/src/app/stores/checkout/useCheckoutStore'
import { log } from '@/src/utils/logger.util'
import useOrder from '@/src/hooks/api/useOrderApi'
import useAuth from '@/src/hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import * as Linking from 'expo-linking'

const CheckoutScreen = () => {
  const { user } = useAuth()
  const navigation = useNavigation()
  const course = useCheckoutStore((state) => state.course)
  const isCompleted = useCheckoutStore((state) => state.isCompleted)
  const orderFail = useCheckoutStore((state) => state.orderFail)
  const { createOrder } = useOrder()

  const sendOrder = async (courseId: string) => {
    log.info('Order sent')
    const response = await createOrder(courseId)

    if (response) {
      await Linking.openURL(response.deeplink)
    } else {
      orderFail()
    }
  }

  if (!user) {
    navigation.navigate('Login')
  }

  return (
    <Container flex='1' padding='5' backgroundColor='#fff' minWidth='100%' centerContent={false}>
      {course && !isCompleted ? (
        <>
          <Heading mb='5'>Order details</Heading>
          <Flex direction='row' alignItems='center' justifyContent='space-between' width='100%' mb='10'>
            <Flex direction='row' alignItems='center' width='40%'>
              <Image
                source={{
                  uri: course.thumbnail
                }}
                alt='Course thumbnail'
                size='sm'
                mr='2'
              />
              <Heading size='sm'>{course.title}</Heading>
            </Flex>
            <Text color='black' fontWeight='medium' fontSize='sm'>
              {Intl.NumberFormat('en-DE').format(course.price) + ' ₫'}
            </Text>
          </Flex>
          {/* <Divider />
        <Heading>Payment method</Heading> */}
          <Divider />
          <Heading my='5'>Summary</Heading>
          <Flex direction='row' alignItems='center' justifyContent='space-between' width='100%' mb='10'>
            <Text color='black' fontWeight='bold' fontSize='md'>
              Total
            </Text>
            <Text color='black' fontWeight='medium' fontSize='md'>
              {Intl.NumberFormat('en-DE').format(course.price) + ' ₫'}
            </Text>
          </Flex>
          <Button
            width='100%'
            backgroundColor='#3D5CFF'
            variant='solid'
            borderRadius='md'
            _pressed={{ opacity: 0.6 }}
            onPress={() => sendOrder(course._id)}
          >
            Order
          </Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  )
}

export default CheckoutScreen
