import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from './(tabs)/HomeScreen'
import { Ionicons, FontAwesome6 } from '@expo/vector-icons'
import CoursesScreen from './(tabs)/CoursesScreen'
import useAuth from '../hooks/useAuth'
import CustomerInfoScreen from './(tabs)/CustomerInfoScreen'

const Tab = createBottomTabNavigator()

const HomeNavigation = ({ navigation }: any) => {
  const { idToken } = useAuth()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: '#3D5CFF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500'
        },
        tabBarStyle: {
          height: 75,
          paddingBottom: 10,
          paddingTop: 10
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='home' size={24} color={color} />
        }}
      />
      <Tab.Screen
        name='Courses'
        component={CoursesScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name='book' size={24} color={color} />
        }}
      />
      <Tab.Screen
        name='Customer'
        component={CustomerInfoScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='person' size={24} color={color} />
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate(idToken ? 'Customer' : 'LoginRegister')
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeNavigation
