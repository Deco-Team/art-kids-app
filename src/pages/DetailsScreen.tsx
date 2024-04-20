import React from 'react'
import { Button, SafeAreaView, Text } from 'react-native'

const DetailsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  )
}

export default DetailsScreen
