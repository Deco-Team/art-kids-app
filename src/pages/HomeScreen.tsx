import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const [text, onChangeText] = React.useState('Useless Text')
  const [number, onChangeNumber] = React.useState('')

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
      <Button title='Go to Details' onPress={() => navigation.navigate('Details')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})

export default HomeScreen
