import { SafeAreaView, Text } from 'react-native'
import useAuth from '../hooks/useAuth'
import { Button } from 'native-base'

const CustomerInfoScreen = () => {
  const { idToken, user, logout } = useAuth()
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{idToken ? 'Hi ' + user?.name : 'Please login'}</Text>
      <Text>CustomerInfoScreen</Text>
      <Button onPress={logout}>Logout</Button>
    </SafeAreaView>
  )
}

export default CustomerInfoScreen
