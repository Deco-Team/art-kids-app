import { Image, SafeAreaView, Text, View } from 'react-native'
import { Button, Pressable } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useAuth from '@/src/hooks/useAuth'

const CustomerInfoScreen = () => {
  const { idToken, user, logout } = useAuth()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, padding: 20 }}>Account</Text>
        <Image source={require('../../../assets/Avatar.png')} style={{ alignSelf: 'center', marginBottom: 20 }} />
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20, alignSelf: 'center' }}>
          {idToken ? user?.name : 'Please login'}
        </Text>
        <Pressable
          _pressed={{ backgroundColor: 'gray.200' }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
            paddingHorizontal: 20,
            paddingVertical: 10
          }}
          onPress={() => navigation.navigate('MyCourse')}
        >
          <Text style={{ fontSize: 20, fontWeight: '500' }}>My course</Text>
          <Ionicons name='arrow-forward-outline' size={24} color='black' />
        </Pressable>
        <Pressable
          _pressed={{ backgroundColor: 'gray.200' }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
            paddingHorizontal: 20,
            paddingVertical: 10
          }}
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <Text style={{ fontSize: 20, fontWeight: '500' }}>Purchase history</Text>
          <Ionicons name='arrow-forward-outline' size={24} color='black' />
        </Pressable>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          style={{
            borderRadius: 10,
            borderColor: '#3D5CFF',
            borderWidth: 2,
            marginHorizontal: 20,
            width: 200,
            alignSelf: 'center'
          }}
          _text={{ color: '#121316', fontWeight: 'bold', fontSize: 16 }}
          variant={'outline'}
          onPress={logout}
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default CustomerInfoScreen
