import { Spinner } from 'native-base'
import { SafeAreaView } from 'react-native'

const LoadingScreen = () => {
  return (
    <SafeAreaView>
      <Spinner color='cyan.500' />
    </SafeAreaView>
  )
}

export default LoadingScreen
