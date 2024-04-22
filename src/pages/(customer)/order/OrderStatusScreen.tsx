import { useCheckoutStore } from '@/src/app/stores/checkout/useCheckoutStore'
import { useNavigation } from '@react-navigation/native'
import { Button, Image, Text, View } from 'native-base'
import { useEffect } from 'react'

const OrderStatusScreen = ({ route }: any) => {
  const { course, isSuccess, isCompleted, orderSuccess, orderFail } = useCheckoutStore()
  const navigation = useNavigation()
  const params = route.params

  useEffect(() => {
    if (!isCompleted) {
      if (params.resultCode === '0') {
        orderSuccess()
      } else {
        orderFail()
      }
    }
  }, [])

  return isCompleted ? (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
        paddingHorizontal: 20
      }}
    >
      <Image
        source={isSuccess ? require('../../../../assets/SuccessIcon.jpg') : require('../../../../assets/FailIcon.jpg')}
        backgroundColor={'amber.300'}
        size={'xl'}
        alt='icon'
        mb={4}
      />
      <Text fontSize={24} fontWeight={'bold'} mb={4}>
        {isSuccess ? 'Successful purchase!' : 'Purchase error!'}
      </Text>
      <Button
        width='75%'
        backgroundColor='#3D5CFF'
        variant='solid'
        borderRadius='lg'
        _pressed={{ opacity: 0.8 }}
        onPress={() => {
          !isSuccess ? navigation.navigate('HomeNavigation') : navigation.navigate('MyCourseDetails', { id: course?._id })
        }}
      >
        {!isSuccess ? 'Home' : 'Start learning'}
      </Button>
    </View>
  ) : (
    <></>
  )
}

export default OrderStatusScreen
