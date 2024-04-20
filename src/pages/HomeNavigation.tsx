import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Tab1Screen from './(tabs)/Tab1'
import Tab2Screen from './(tabs)/Tab2'
import Tab3Screen from './(tabs)/Tab3'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false
      }}
    >
      <Tab.Screen name='Tab1' component={Tab1Screen} />
      <Tab.Screen name='Tab2' component={Tab2Screen} />
      <Tab.Screen name='Tab3' component={Tab3Screen} />
    </Tab.Navigator>
  )
}

export default HomeNavigation
