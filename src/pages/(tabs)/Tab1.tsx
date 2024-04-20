import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Button } from 'native-base'
import useAuth from '../../hooks/useAuth'

const Tab1Screen = ({ navigation }: any) => {
  const { idToken, user } = useAuth()
  return (
    <ScrollView indicatorStyle={'black'} style={styles.view}>
      <Text>{idToken ? 'Hi ' + user?.name : 'Please login'}</Text>
      <Text>Tab1Screen</Text>
        <Button onPress={() => navigation.navigate('Details')}>Details</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white'
  }
})

export default Tab1Screen
