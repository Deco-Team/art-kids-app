import React, { useContext } from 'react'
import { IconButton, NativeBaseProvider } from 'native-base'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailsScreen from './src/pages/DetailsScreen'
import LoginScreen from './src/pages/(authentication)/LoginScreen'
import RegisterScreen from './src/pages/(authentication)/RegisterScreen'
import HomeNavigation from './src/pages/HomeNavigation'
import { Ionicons } from '@expo/vector-icons'
import LoginRegisterScreen from './src/pages/(authentication)/LoginRegisterScreen'
import AuthProvider from './src/contexts/AuthContext'
import 'core-js/stable/atob'
import CustomerInfoScreen from './src/pages/(tabs)/CustomerInfoScreen'
import { Text } from 'react-native'

const Stack = createNativeStackNavigator()

export default function App({ route }: any) {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: 'transparent',
              headerShadowVisible: false
            }}
          >
            <Stack.Screen
              name='HomeNavigation'
              component={HomeNavigation}
              options={{
                headerStyle: {
                  backgroundColor: '#3D5CFF'
                },
                headerLeft: () => {
                  return (
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', paddingLeft: 10 }}>Art Kids</Text>
                  )
                },
                headerRight: () => (
                  <IconButton
                    icon={<Ionicons name='notifications' size={24} color='white' />}
                    borderRadius={'full'}
                    _pressed={{
                      bg: 'transparent',
                      opacity: 0.6
                    }}
                  />
                )
              }}
            />
            <Stack.Screen
              name='Details'
              component={DetailsScreen}
              options={{
                headerLeft: () => {
                  const navigation = useNavigation()
                  return (
                    <IconButton
                      backgroundColor={'#ffffffa3'}
                      icon={<Ionicons name='arrow-back-outline' size={24} color='black' />}
                      borderRadius={'full'}
                      _pressed={{
                        bg: '#ffffffa3',
                        opacity: 0.6
                      }}
                      onPress={() => navigation.goBack()}
                    />
                  )
                },
                headerTransparent: true
              }}
            />
            <Stack.Screen name='Info' component={CustomerInfoScreen} />
            <Stack.Screen
              name='LoginRegister'
              component={LoginRegisterScreen}
              options={{
                presentation: 'fullScreenModal',
                headerLeft: () => {
                  const navigation = useNavigation()
                  return (
                    <IconButton
                      backgroundColor={'#ffffffa3'}
                      icon={<Ionicons name='arrow-back-outline' size={24} color='black' />}
                      borderRadius={'full'}
                      _pressed={{
                        bg: '#ffffffa3',
                        opacity: 0.6
                      }}
                      onPress={() => navigation.goBack()}
                    />
                  )
                }
              }}
            />
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{
                presentation: 'fullScreenModal',
                headerLeft: () => {
                  const navigation = useNavigation()
                  return (
                    <IconButton
                      backgroundColor={'#ffffffa3'}
                      icon={<Ionicons name='arrow-back-outline' size={24} color='black' />}
                      borderRadius={'full'}
                      _pressed={{
                        bg: '#ffffffa3',
                        opacity: 0.6
                      }}
                      onPress={() => navigation.navigate('HomeNavigation' as never)}
                    />
                  )
                }
              }}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{
                presentation: 'fullScreenModal',
                headerLeft: () => {
                  const navigation = useNavigation()
                  return (
                    <IconButton
                      backgroundColor={'#ffffffa3'}
                      icon={<Ionicons name='arrow-back-outline' size={24} color='black' />}
                      borderRadius={'full'}
                      _pressed={{
                        bg: '#ffffffa3',
                        opacity: 0.6
                      }}
                      onPress={() => navigation.navigate('HomeNavigation' as never)}
                    />
                  )
                }
              }}
            />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
