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
import AuthProvider, { AuthContext } from './src/contexts/AuthContext'
import 'core-js/stable/atob'
import CustomerInfoScreen from './src/pages/CustomerInfo'
import useAuth from './src/hooks/useAuth'

const Stack = createNativeStackNavigator()

export default function App() {
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
              name='Home'
              component={HomeNavigation}
              options={{
                headerStyle: {
                  backgroundColor: '#3D5CFF'
                },
                headerLeft: () => {
                  const navigation = useNavigation()
                  const { idToken } = useAuth()
                  return (
                    <IconButton
                      icon={<Ionicons name='person' size={24} color='white' />}
                      borderRadius={'full'}
                      _pressed={{
                        bg: 'transparent',
                        opacity: 0.6
                      }}
                      onPress={() => navigation.navigate(!idToken ? ('LoginRegister' as never) : ('Info' as never))}
                    />
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
            <Stack.Screen name='Details' component={DetailsScreen} />
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
                      icon={<Ionicons name='arrow-back-outline' size={24} color='black' />}
                      borderRadius={'full'}
                      _pressed={{
                        bg: 'transparent',
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
                      icon={<Ionicons name='arrow-back-outline' size={24} color='black' />}
                      borderRadius={'full'}
                      _pressed={{
                        bg: 'transparent',
                        opacity: 0.6
                      }}
                      onPress={() => navigation.navigate('Home' as never)}
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
                      icon={<Ionicons name='arrow-back-outline' size={24} color='black' />}
                      borderRadius={'full'}
                      _pressed={{
                        bg: 'transparent',
                        opacity: 0.6
                      }}
                      onPress={() => navigation.navigate('Home' as never)}
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
