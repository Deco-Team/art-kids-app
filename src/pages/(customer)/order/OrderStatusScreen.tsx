import { useCheckoutStore } from '@/src/app/stores/checkout/useCheckoutStore'
import { useNavigation } from '@react-navigation/native'
import { Button, Image, Text, View } from 'native-base'

const OrderStatusScreen = () => {
  const isSuccess = useCheckoutStore((state) => state.isSuccess)
  const course = useCheckoutStore((state) => state.course)
  const navigation = useNavigation()
  return (
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
          isSuccess ? navigation.navigate('HomeNavigation') : navigation.navigate('Details', { id: course?._id })
        }}
      >
        Start learning
      </Button>
    </View>
  )
}

export default OrderStatusScreen
