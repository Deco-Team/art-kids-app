import useAuth from '@/src/hooks/useAuth'
import { Button, IconButton } from 'native-base'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const LoginRegisterScreen = ({ navigation }: any) => {
  const { idToken } = useAuth()

  if (idToken) {
    navigation.reset({ index: 0, routes: [{ name: 'HomeNavigation' }] })
  }
  return (
    <SafeAreaView style={style.view}>
      <Image style={style.image} source={require('../../../assets/illustration.png')} />
      <Text style={style.header}>Fill your imagination</Text>
      <Text style={style.description}>Interesting courses are waiting for you, feel free to be creative</Text>
      <View style={style.buttonWrapper}>
        <Button
          style={style.signupButton}
          variant={'solid'}
          onPress={() => navigation.navigate('Register')}
          _text={{
            fontWeight: '500',
            fontSize: 20
          }}
        >
          Sign up
        </Button>
        <Button
          style={style.loginButton}
          variant={'outline'}
          onPress={() => navigation.navigate('Login')}
          _text={{
            color: '#3D5CFF',
            fontWeight: '500',
            fontSize: 20
          }}
        >
          Log in
        </Button>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  buttonWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  signupButton: {
    width: 140,
    height: 60,
    backgroundColor: '#3D5CFF',
    borderRadius: 10
  },
  loginButton: {
    width: 140,
    height: 60,
    borderColor: '#3D5CFF',
    borderRadius: 10
  },
  image: {
    flex: 2,
    height: 260,
    width: 260,
    resizeMode: 'contain'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  }
})

export default LoginRegisterScreen
